const { Users } = require('../fields')

module.exports = {
    login,
    signup
}

function login(req) {
    try {
        
        const users = new Users(req)
    
        const data = {
            email: users.email.get(),
            password: users.password.get(),
        }
    
        return {data}
    
    } catch(error) {
        throw error
    }
}


function signup(req) {

    const users = new Users(req)

    const data = {
        company: users.company.get(),
        fullName: users.fullName.get(),
        website: users.website.get(),
        address: users.address.get(),
        zipCode: users.zipCode.get(),
        country: users.country.get(),
        phone: users.phone.get(),
        email: users.email.get(),
        password: users.password.get(),
    }

    return { data }
}
