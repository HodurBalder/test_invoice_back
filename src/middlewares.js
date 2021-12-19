const Messages = require('./messages')
const Services = require('./services')

module.exports = {
    auth,
    admin
}

async function auth(req, res, next) {
    try {

        const token = req.headers.token

        if(!token)
            throw Messages().tokenRequired

        const session = await Services.Sessions.getSessionToken(token)
            .catch(e => { throw e })

        if(session.user.status === 'disabled')
            return res.$error(Messages(user).userDisabled)

        const roles = ['admin','cedis','user']

        if(roles.indexOf(session.user.role) === -1) {
            delete req.query.userId
            delete req.query.user
            delete req.query.all
        }

        if(session.user.role === 'admin') {
            req.adminId = session.user._id
            req.admin = session.user
        }

        req.userId = session.user._id
        req.user = session.user

        next()

    } catch(error) {
        return res.$error(error)
    }
}

async function admin(req, res, next) {
    try {

        const user = req.user
        const roles = ['admin']

        if(roles.indexOf(user.role) === -1)
            return res.$error(Messages(user).accessAdmin)

        next()

    } catch(error) {
        return res.$error(error)
    }
}
