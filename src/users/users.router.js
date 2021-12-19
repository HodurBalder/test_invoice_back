const Router = require('express').Router()
const Controller = require('./users.controller')
const Middleware = require('../middlewares')

Router.post('/login', Controller.login)

Router.post('/users', Controller.signup)

Router.get('/users', Middleware.auth, Controller.getUsers)

Router.get('/users/:userId', Middleware.auth, Controller.getUser)

Router.put('/users/:userId', Middleware.auth, Controller.updateUser)

Router.delete('/users/:userId', Middleware.auth, Controller.deleteUser)

module.exports = Router