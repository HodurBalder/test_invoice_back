const Schema = require('mongoose').Schema
const Model = require('mongoose').model
const Encrypt = require('../encryp')

const schema = new Schema({

    role: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ['admin', 'user'],
        default: 'user'
    },

    status: {
        type: String,
        enum: ['enabled', 'disabled'],
        default: 'enabled'
    },

    company: {
        type: String
    },

    logo: {
        type: String
    },

    fullName: {
        type: String
    },

    website: {
        type: String
    },

    address: {
        type: String
    },

    zipCode: {
        type: String
    },

    country: {
        type: String
    },

    phone: {
        type: String
    },

    email: {
        type: String,
        lowercase: true,
        required: true
    },

    password: {
        type: String,
        select: false
    },

    updated: {
        type: Date,
        default: Date.now
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {

    if(this.password)
        this.password = Encrypt.bcryptHash(this.password)

    this.updated = new Date()
    next()
})

module.exports = Model('Users', schema)