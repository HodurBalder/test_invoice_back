const Router = require('express').Router()
const Controller = require('./users.controller')

Router.post('/users/login', Controller.login)

Router.post('/users', Controller.signup)

module.exports = Router