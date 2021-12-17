require('dotenv').config()

module.exports = {
    enviroment: process.env.ENVIROMENT,
    mongodb: process.env.MONGODB,
    port: process.env.PORT,
    host: process.env.HOST,
    brand: process.env.BRAND
}