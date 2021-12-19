const Model = require('./users.model')
const Messages = require('./users.messages')
const Encrypt = require('../encryp')
const Services = require('../services')


module.exports = {
    login,
    signup,
    getUser,
    getUsers,
    updateUser,
    findUser,
    Model,
    Messages,
    deleteUser
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

        if(!Encrypt.bcryptCompare(data.password, user.password))
            throw Messages(data).userPasswordError

        const session = await Services.Sessions.createSession({userId: user._id})
            .catch(e => { throw e })

        return {
            user,
            session
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



async function getUser(userId) {
    try {

        const user = await Model.findOne({_id: userId})
            .catch(e => { throw Messages(e).userGetError })

        if(!user)
            throw Messages(userId).userNotFound

        return user

    } catch(error) {
        throw error
    }
}

async function getUsers(data, query) {
    try {

        const options = {}
        
        if(query.find) {
            const regexp = new RegExp(query.find, 'i')
            options.$or = [
                {name: regexp},
                {email: regexp},
                {phone: regexp},
                {company: regexp},
            ]
        }

        if(query.status)
            options.status = query.status

        if(query.role)
            options.role = query.role

        const users = await Model.find(options)
            .sort({created: -1})
            .catch(e => { throw Messages(e).userGetError })

        return {
            users,
        }

    } catch(error) {
        throw error
    }
}

async function updateUser(userId, data) {
    try {

        const user = await getUser(userId)
            .catch(e => { throw e })

        const keys = Object.keys(data)

        keys.forEach(key => {
            user[key] = data[key]
        })

        if(data.email) {

            const exists = await findUser(data.email)
                .catch(e => { throw e })

            if(exists && userId != user._id.toString())
                throw Messages('El correo ya se encuentra registrado').userExistsError
        }

        await user.save()
            .catch(e => { throw Messages(e).userSaveError })

        return await getUser(userId)
            .catch(e => { throw e })

    } catch(error) {
        throw error
    }
}

async function deleteUser(userId) {
    try {
        await getUser(userId)
            .catch(e => { throw e })

        await Model.deleteOne({_id: userId})
            .catch(e => { throw Messages(e).userDeleteError})

        return userId

    } catch(error) {
        throw error
    }
}


async function findUser(value) {
    try {

        const regexp = new RegExp(value, 'i')

        const options = {
            $or: [
                {email: regexp},
                {name: regexp},
                {phone: regexp},
                {company: regexp},
            ]
        }

        return Model.findOne(options)
            .catch(e => { throw Messages(e).userGetError })

    } catch(error) {
        throw error
    }
}
