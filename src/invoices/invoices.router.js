const Router = require('express').Router()
const Controller = require('./invoices.controller')
const Middlewares = require('../middlewares')

Router.post('/invoices', Middlewares.auth, Controller.createInvoice)

Router.get('/invoices', Middlewares.auth, Controller.getInvoices)

Router.get('/invoices/:invoiceId', Middlewares.auth, Controller.getInvoice)

Router.put('/invoices/:invoiceId', Middlewares.auth, Controller.updateInvoice)

Router.delete('/invoices/:invoiceId', Middlewares.auth, Controller.deleteInvoice)


module.exports = Router