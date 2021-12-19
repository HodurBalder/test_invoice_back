const Service = require('./users.service')
const Validation = require('./users.validation')

module.exports = {
    login,
    signup,
    getUsers,
    updateUser,
    deleteUser,
    getUser
}

async function login(req, res) {
    try {

        const {data} = Validation.login(req)
        console.log(data)
        res.$data(await Service.login(data))

    } catch(error) {
        res.$error(error)
    }
}

async function signup(req, res) {
    try {
        const {data} = Validation.signup(req)
        res.$data(await Service.signup(data))

    } catch(error) {
        res.$error(error)
    }
}

async function getUsers(req, res) {
    try {

        const {data, query} = Validation.getUsers(req)
        res.$data(await Service.getUsers(data, query))

    } catch(error) {
        res.$error(error)
    }
}
async function getUser(req, res) {
    try {

        const {data} = Validation.getUser(req)
        res.$data(await Service.getUser(data.userId))

    } catch(error) {
        res.$error(error)
    }
}

async function updateUser(req, res) {
    try {

        const {data} = Validation.updateUser(req)
        res.$data(await Service.updateUser(data.userId, data))

    } catch(error) {
        res.$error(error)
    }
}

async function deleteUser(req, res) {
    try {
        const {data} = Validation.deleteUser(req)
        res.$data(await Service.deleteUser(data.userId))

    } catch(error) {
        res.$error(error)
    }
}