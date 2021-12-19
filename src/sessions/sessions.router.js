const Router = require('express').Router()
const Controller = require('./sessions.controller')
const Middlewares = require('../middlewares')

Router.post('/sessions', Controller.verifySession)

Router.get('/sessions', Middlewares.auth, Controller.getSessions)

Router.get('/sessions/token/:token', Controller.getSessionToken)

Router.delete('/sessions/:sessionId', Middlewares.auth, Controller.deleteSession)

module.exports = Router