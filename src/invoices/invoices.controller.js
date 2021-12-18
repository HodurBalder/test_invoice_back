const Service = require('./invoices.service')
const Validation = require('./invoices.validation')

module.exports = {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice
}

async function createInvoice(req, res) {
    try {

        const {data} = Validation.createInvoice(req)
        res.$data(await Service.createInvoice(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getInvoices(req, res) {
    try {

        const {data} = Validation.getInvoices(req)
        res.$data(await Service.getInvoices(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getInvoice(req, res) {
    try {

        const {data} = Validation.getInvoice(req)
        res.$data(await Service.getInvoice(data.invoiceId))

    } catch(error) {
        res.$error(error)
    }
}

async function updateInvoice(req, res) {
    try {

        const {data} = Validation.updateInvoice(req)
        res.$data(await Service.updateInvoice(data.invoiceId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteInvoice(req, res) {
    try {

        const {data} = Validation.deleteInvoice(req)
        res.$data(await Service.deleteInvoice(data.invoiceId))

    } catch(error) {
        res.$error(error)
    }
}