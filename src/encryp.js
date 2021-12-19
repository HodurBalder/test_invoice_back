const Crypto = require('crypto')
const Bcrypt = require('bcrypt')
const Config = require('./config')


module.exports = {
    bcryptHash,
    bcryptCompare,
    hashRandom
}


function bcryptHash(value) {
    return Bcrypt.hashSync(value, 10)
}

function bcryptCompare(value, hash) {
    return Bcrypt.compareSync(value, hash)
}

function hashRandom(length = 16) {
    
    const hash = Crypto.createHash('sha256', Config.brand)
          hash.update(new Date().toISOString())

    return hash.digest('hex').slice(0, length).toUpperCase()
}