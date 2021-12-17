const Mongoose = require('mongoose')
const Users = require('./users/users.service')
const Config = require('./config')

module.exports = async function() {
    try {

        await Mongoose.connect(Config.mongodb, {useNewUrlParser: true, useUnifiedTopology: true})

        const user = await Users.Model.findOne({role: 'admin'})
            .catch(e => { throw e })

        if(!user) {
            
            const user = new Users.Model({
                role: 'admin',
                firstName: 'admin',
                lastName: Config.brand,
                email: `admin@${Config.brand}.com`, 
                password: 'root'
            })

            await user.save()
                .catch(e => { throw e })
        }

        return console.log(`[MONGODB] ${Config.mongodb}`)

    } catch(error) {

        console.log(`[MONGODB] ${Config.mongodb} ERROR DE CONEXION`, true)
        console.log(error, true)
        
        throw error
    }
}