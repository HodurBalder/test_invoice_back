const Express = require("express")
const Morgan = require('morgan')
const Cors = require('cors')

const Database = require('./database')
const Router = require('../src/router')
const Config = require('./config')
const Response = require('./response')


const App = Express()
App.use(Cors())
App.use(Express.static('public'))
App.use(Express.json({
    limit: '10mb',
    verify: function(req, res, buf, encoding) {
        req.rawbody = buf.toString()
    }
}))


App.use(Morgan('dev'))

App.use((req, res, next) => {
    res.$data = data => Response.$data(data, res)
    res.$file = data => Response.$file(data, res)
    res.$error = data => Response.$error(data, res)
    res.$redirect = data => Response.$redirect(data, res)
    next()
})

App.use(Router)

console.log(`[ENVIROMENT] ${Config.enviroment}`)

Database().then(() => {
    App.listen(Config.port, () => {
        console.log(`[HOST] ${Config.host}`)
        console.log(`[PORT] ${Config.port}`)
    })
}).catch(() => process.exit())