const Schema = require('mongoose').Schema
const ObjectId = require('mongoose').Types.ObjectId
const Model = require('mongoose').model

const schema = new Schema({

    user: {
        type: ObjectId,
        ref: 'Users'
    },

    userId: {
        type: ObjectId
    },

    token: {
        type: String
    },

    access: {
        type: Date
    },

    expired: {
        type: Date
    },

    created: {
        type: Date,
        default: Date.now
    }
})

schema.pre('save', function(next) {
    this.user = this.userId
    next()
})

module.exports = Model('Sessions', schema)