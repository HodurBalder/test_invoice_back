const Service = require('./sessions.service')
const Validation = require('./sessions.validation')

module.exports = {
    getSessions,
    getSessionToken,
    deleteSession,
    verifySession
}

async function getSessions(req, res) {
    try {

        const {data, query} = Validation.getSessions(req)
        res.$data(await Service.getSessions(data, query))

    } catch(error) {
        res.$error(error)
    }
}

async function getSessionToken(req, res) {
    try {

        const {data} = Validation.getSessionToken(req)
        res.$data(await Service.getSessionToken(data.token))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteSession(req, res) {
    try {

        const {data} = Validation.deleteSession(req)
        res.$data(await Service.deleteSession(data.sessionId))

    } catch(error) {
        res.$error(error)
    }
}

async function verifySession(req, res) {
    try {

        const {data} = Validation.verifySession(req)
        res.$data(await Service.verifySession(data.token))

    } catch(error) {
        res.$error(error)
    }
}