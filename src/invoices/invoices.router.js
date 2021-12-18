const Router = require('express').Router()
const Controller = require('./invoices.controller')

Router.post('/invoices', Controller.createInvoice)

Router.get('/invoices', Controller.getInvoices)

Router.get('/invoices/:invoiceId', Controller.getInvoice)

Router.put('/invoices/:invoiceId', Controller.updateInvoice)

Router.delete('/invoices/:invoiceId', Controller.deleteInvoice)


module.exports = Router