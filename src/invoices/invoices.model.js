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

    invoiceNum: {
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
    },

    invoiceDate: {
        type: Date
    },

    dueDate: {
        type: Date
    }

})

schema.pre('save', function(next) {

    this.user = this.userId

    next()
})

module.exports = Model('Invoices', schema)