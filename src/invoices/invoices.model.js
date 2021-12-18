const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const ObjectId = require('mongoose').Types.ObjectId

const schema = new Schema({

    userId: {
        type: ObjectId
    },

    user: {
        type: ObjectId,
        ref: 'Users'
    },

    invoiceId: {
        type: Number
    },

    companyClient: {
        type: String,
    },

    fullNameClient: {
        type: String,
    },

    addressClient: {
        type: String,
    },

    zipCodeClient: {
        type: String,
    },

    countryClient: {
        type: String
    },

    concepts: {
        type: [{
            id: Number, 
            description: String,
            units: Number, 
            price: Number, 
        }]
    },
    
    notes: {
        type: String
    },

    subtotal: {
        type: Number
    },

    tax: {
        type: Number
    },

    discount: {
        type: Number
    },

    total: {
        type: Number
    }

})

schema.pre('save', function(next) {

    this.user = this.userId
    this.updated = new Date()

    next()
})

module.exports = Model('Invoices', schema)