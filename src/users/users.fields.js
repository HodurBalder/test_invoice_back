const validator = require('../validator')

const Fields = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.userId = validator({
        type: 'objectId',
        value: props.userId,
        name: 'identificador del usuario'
    })

    this.role = validator({
        type: 'string',
        value: props.role,
        name: 'rol de usuario'
    })

    this.status = validator({
        type: 'string',
        value: props.status,
        name: 'estatus',
        enum: [
            'enabled',
            'disabled'
        ]
    })

    this.company = validator({
        type: 'string',
        value: props.company,
        name: 'empresa'
    })

    this.fullName = validator({
        type: 'string',
        value: props.fullName,
        name: 'nombre completo'
    })

    this.website = validator({
        type: 'string',
        value: props.website,
        name: 'sitio web'
    })

    this.address = validator({
        type: 'string',
        value: props.address,
        name: 'direccion'
    })

    this.zipCode = validator({
        type: 'string',
        value: props.zipCode,
        name: 'codigo postal'
    })


    this.country = validator({
        type: 'string',
        value: props.country,
        name: 'pais'
    })

    this.phone = validator({
        type: 'phone',
        value: props.phone,
        name: 'teléfono'
    })

    this.email = validator({
        type: 'email',
        value: props.email,
        name: 'correo'
    })

    this.password = validator({
        type: 'string',
        value: props.password,
        name: 'contraseña'
    })

    return this
}

module.exports = Fields