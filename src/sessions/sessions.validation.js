const { Sessions } = require('../fields')

module.exports = {
    getSessions,
    getSessionToken,
    deleteSession,
    verifySession
}

function getSessions(req) {

    const sessions = new Sessions(req)

    const data = {
        userId: req.query.userId || req.userId
    }

    const query = {

    }

    return { data, query }
}

function getSessionToken(req) {

    const data = {
        token: req.params.token
    }

    return { data }
}

function deleteSession(req) {

    const sessions = new Sessions(req)

    const data = {
        sessionId: sessions.sessionId.get()
    }

    return { data }
}

function verifySession(req) {

    const data = {
        token: req.body.token
    }

    return { data }
}