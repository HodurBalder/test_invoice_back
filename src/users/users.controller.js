const Service = require('./users.service')
const Validation = require('./users.validation')

module.exports = {
    login,
    signup,
}

async function login(req, res) {
    try {

        const {data} = Validation.login(req)
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

