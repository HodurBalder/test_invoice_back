const Model = require('./users.model')
const Messages = require('./users.messages')

module.exports = {
    login,
    signup,
    Model
}

async function login(data) {
    try {

        let user = await Model.findOne({email: data.email})
            .select('+password')
            .catch(e => { throw Messages(e).userGetError })

        if(!user)
            throw Messages(data).userNotFound

        if(user.status === 'disabled')
            throw Messages(data).userDisabled

        return {
            user,
        }

    } catch(error) {
        throw error
    }
}

async function signup(data) {
    try {

        let user = await Model.findOne({ email: data.email })
            .catch(e => { throw Messages(e).userGetError })

        if (user)
            throw Messages(data.email).userExistsError

        user = await new Model(data).save()
            .catch(e => { throw Messages(e).userSaveError })

        return {user}

    } catch (error) {
        throw error
    }
}

