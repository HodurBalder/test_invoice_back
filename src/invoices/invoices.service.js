const Model = require('./invoices.model')
const Messages = require('./invoices.messages')

module.exports = {
    createInvoice,
    getInvoices,
    getInvoice,
    updateInvoice,
    deleteInvoice,
}

async function createInvoice(data) {
    try {

        const invoice = await new Model(data)

        return invoice.save()
            .catch(e => { throw Messages(e).invoiceSaveError })

    } catch(error) {
        throw error
    }
}

async function getInvoices(query) {
    try {

        const options = {}
        
        Object.keys(query)
        .forEach(prop => query[prop] != undefined && (options[prop] = query[prop]))

        return Model.find(options)
            .catch(e => { throw Messages(e) })

    } catch(error) {
        throw error
    }
}

async function getInvoice(invoiceId) {
    try {
        const invoice = await Model.findOne({invoiceId: invoiceId})
            .catch(e => { throw Messages(e).invoiceGetError })
            
        if(!invoice)
            throw Messages(invoiceId).invoiceNotFound

        return invoice

    } catch(error) {
        throw error
    }
}
async function updateInvoice(invoiceId, data) {
    try {
        console.log('holamundo')
        const invoice = await getInvoice(invoiceId)
            .catch(e => { throw e })

        const keys = Object.keys(data)

        keys.forEach(key => invoice[key] = data[key])

        await invoice.save()
            .catch(e => { throw Messages(e).invoiceSaveError })

        return await getInvoice(invoiceId)
            .catch(e => { throw e })

    } catch(error) {
        throw error
    }
}

async function deleteInvoice(invoiceId) {
    try {

        await getInvoice(invoiceId)
            .catch(e => { throw e })

        await Model.deleteOne({invoiceId: invoiceId})
            .catch(e => { throw Messages(e).invoiceDeleteError})

        return invoiceId

    } catch(error) {
        throw error
    }
}