const validator = require('../validator')

const Fields = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.invoiceId = validator({
        name: 'identificador de factura',
        type: 'number',
        value: props.invoiceId
    })

    this.userId = validator({
        name: 'identificador del usuario',
        type: 'objectId',
        value: props.userId,
    })

    this.companyClient = validator({
        type: 'string',
        value: props.companyClient,
        name: 'empresa del cliente'
    })

    this.fullNameClient = validator({
        type: 'string',
        value: props.fullNameClient,
        name: 'nombre completo del cliente'
    })

    this.addressClient = validator({
        type: 'string',
        value: props.addressClient,
        name: 'direccion del cliente'
    })

    this.zipCodeClient = validator({
        type: 'string',
        value: props.zipCodeClient,
        name: 'codigo postal del cliente'
    })


    this.countryClient = validator({
        type: 'string',
        value: props.countryClient,
        name: 'pais del cliente'
    })

    this.concepts = validator({
        type: 'array',
        value: props.concepts,
        name: 'conceptos'
    })

    this.notes = validator({
        type: 'string',
        value: props.notes,
        name: 'notas'
    })

    this.subtotal = validator({
        type: 'number',
        value: props.subtotal,
        name: 'subtotal'
    })

    this.tax = validator({
        type: 'number',
        value: props.tax,
        name: 'impuestos'
    })

    this.discount = validator({
        type: 'number',
        value: props.discount,
        name: 'descuentos'
    })

    this.total = validator({
        type: 'number',
        value: props.total,
        name: 'impuestos'
    })

    return this
}

module.exports = Fields