const { Invoices } = require('../fields')
var mongoose = require('mongoose');


module.exports = {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice,
    updateValidation
}

function createInvoice(req) {

    let invoices = new Invoices(req)

    const data = {
        user: req.user,
        userId: req.user._id,
        invoiceNum: invoices.invoiceNum.notRequired().get(),
        companyClient: invoices.companyClient.notRequired().get(),
        fullNameClient: invoices.fullNameClient.notRequired().get(),
        addressClient: invoices.addressClient.notRequired().get(),
        zipCodeClient: invoices.zipCodeClient.notRequired().get(),
        countryClient: invoices.countryClient.notRequired().get(),
        concepts: invoices.concepts.notRequired().get(),
        notes: invoices.notes.notRequired().get(),
        subtotal: invoices.subtotal.notRequired().get(),
        tax: invoices.tax.notRequired().get(),
        discount: invoices.discount.notRequired().get(),
        total: invoices.total.notRequired().get(),
        invoiceDate: invoices.invoiceDate.notRequired().get(),
        dueDate: invoices.dueDate.notRequired().get()
    }

    return { data }
}


function getInvoices(req) {

    const data = {
        userId: req.query.userId 
    }

    return { data }
}

function getInvoice(req) {

    const invoices = new Invoices(req)

    const data = {
        invoiceId: invoices.invoiceId.get()
    }

    return { data }
}

function updateInvoice(req) {

    const invoices = new Invoices(req)

    let data = {
        invoiceId: invoices.invoiceId.get()
    }

    const props = [
        'invoiceNum',
        'companyClient',
        'fullNameClient',
        'addressClient',
        'zipCodeClient',
        'concepts',
        'subtotal',
        'tax',
        'discount',
        'total',
        'invoiceDate',
        'dueDate'
    ]

    data = updateValidation(data, props, req.body, invoices)

    return { data }
}

function deleteInvoice(req) {

    const invoices = new Invoices(req)

    const data = {
        invoiceId: invoices.invoiceId.get()
    }

    return { data }
}

function updateValidation(data, props, body, validator) {

    props.forEach(prop => {

        if(typeof prop === 'object') {
            data[prop[0]] = {}
            return updateValidation(data[prop[0]], prop[1], body[prop[0]], validator[prop[0]])
        }

        if(body[prop] != undefined)
            data[prop] = validator[prop].get()
    })

    return data
}