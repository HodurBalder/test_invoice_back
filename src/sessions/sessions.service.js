const Moment = require('moment')
const Model = require('./sessions.model')
const Messages = require('./sessions.messages')
const Encrypt = require('../encryp')

module.exports = {
    createSession,
    getSessions,
    getSession,
    getSessionToken,
    updateSession,
    deleteSession,
    Model,
    Messages
}

async function createSession(data) {
    try {

        const expired = Moment().add(15, 'days').toDate()

        data.expired = expired
        data.token = Encrypt.hashRandom(64)

        const session = new Model(data)

        return await session.save()
            .catch(e => { throw Messages(e).sessionSaveError })

    } catch(error) {
        throw error
    }
}

async function getSessions(data, query) {
    try {

        const options = {}

        Object.keys(query)
            .forEach(prop => query[prop] != undefined && (options[prop] = query[prop]))

        return Model.find(options)
            .catch(e => { throw Messages(e) })

    } catch(error) {
        throw error
    }
}

async function getSession(sessionId) {
    try {

        const session = await Model.findOne({_id: sessionId})
            .populate('user')
            .catch(e => { throw Messages(e).sessionGetError })

        if(!session)
            throw Messages(sessionId).sessionNotFound

        return session

    } catch(error) {
        throw error
    }
}

async function getSessionToken(token) {
    try {

        const session = await Model.findOne({token})
            .populate('user')
            .catch(e => { throw Messages(e).sessionGetError })

        if(!session)
            throw Messages(token).sessionNotFound

        if(Moment().isAfter(session.expired))
            throw Messages(session.expired).sessionExpired

        await Model.updateOne({_id: session._id}, {
            $set: {
                access: new Date()
            }
        }).catch(e => { throw Messages(e).sessionSaveError })

        return getSession(session._id)
            .catch(e => { throw e })

    } catch(error) {
        throw error
    }
}

async function updateSession(sessionId, data) {
    try {

        await getSession(sessionId)
            .catch(e => { throw e })

        await Model.updateOne({_id: sessionId}, {$set: data})
            .catch(e => { throw Messages(e).sessionSaveError })

        return getSession(sessionId)
            .catch(e => { throw e })

    } catch(error) {
        throw error
    }
}

async function deleteSession(sessionId) {
    try {

        await getSession(sessionId)
            .catch(e => { throw e })

        await Model.deleteOne({_id: sessionId})
            .catch(e => { throw Messages(e).sessionDeleteError })

        return sessionId

    } catch(error) {
        throw error
    }
}

async function findSession(token) {
    try {

        return await Model.findOne({token})
            .populate('user')
            .catch(e => { throw Messages(e).sessionsGetError })

    } catch(error) {
        throw error
    }
}