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
        userId: invoices.userId.get(),
        invoiceId: invoices.invoiceId.get(),
        companyClient: invoices.companyClient.get(),
        fullNameClient: invoices.fullNameClient.get(),
        addressClient: invoices.addressClient.get(),
        zipCodeClient: invoices.zipCodeClient.get(),
        concepts: invoices.concepts.get(),
        subtotal: invoices.subtotal.get(),
        tax: invoices.tax.get(),
        discount: invoices.discount.get(),
        total: invoices.total.get(),
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
        'invoiceId',
        'companyClient',
        'fullNameClient',
        'addressClient',
        'zipCodeClient',
        'concepts',
        'subtotal',
        'tax',
        'discount',
        'total'
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