const { Users } = require('../fields')

module.exports = {
    login,
    signup,
    getUsers,
    updateUser,
    updateValidation,
    deleteUser,
    getUser
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


function getUsers(req) {

    const data = {
        userId: req.query.userId || req.userId
    }

    const query = {
        role: req.query.role,
        find: req.query.find,
    }

    return { data, query }
}

function updateUser(req, res) {

    const users = new Users(req)

    let data = {
        userId: req.query.userId || req.userId
    }

    const props = [
        'company', 
        'fullName', 
        'website', 
        'address', 
        'zipCode', 
        'country', 
        'phone',
        'email',
        'password'
    ]

    data = updateValidation(data, props, req.body, users)

    return { data }
}

function updateValidation(data, props, body, validator) {

    props.forEach(prop => {

        if(typeof prop === 'object') {
            data[prop[0]] = {}
            return updateValidation(data[prop[0]], prop[1], body[prop[0]], validator[prop[0]])
        }

        if(body[prop] != undefined)
            data[prop] = validator[prop].get()
    })

    return data
}

function deleteUser(req) {

    const user = new Users(req)

    const data = {
        userId: user.userId.get()
    }

    return { data }
}

function getUser(req) {

    const users = new Users(req)

    const data = {
        userId: users.userId.get()
    }

    return { data }
}
