const validator = require('../validator')

const Fields = function(req) {

    const props = {...req.headers, ...req.params, ...req.query, ...req.body}

    this.invoiceId = validator({
        name: 'identificador de factura',
        type: 'number',
        value: props.invoiceId,
        required: false
    })

    this.invoiceNum = validator({
        name: 'numero de factura',
        type: 'number',
        value: props.invoiceNum,
        required: false
    })

    this.userId = validator({
        name: 'identificador del usuario',
        type: 'objectId',
        value: props.userId,
        required: false
    })

    this.companyClient = validator({
        type: 'string',
        value: props.companyClient,
        name: 'empresa del cliente',
        required: false
    })

    this.fullNameClient = validator({
        type: 'string',
        value: props.fullNameClient,
        name: 'nombre completo del cliente',
        required: false
    })

    this.addressClient = validator({
        type: 'string',
        value: props.addressClient,
        name: 'direccion del cliente',
        required: false
    })

    this.zipCodeClient = validator({
        type: 'string',
        value: props.zipCodeClient,
        name: 'codigo postal del cliente',
        required: false
    })


    this.countryClient = validator({
        type: 'string',
        value: props.countryClient,
        name: 'pais del cliente',
        required: false
    })

    this.concepts = validator({
        type: 'array',
        value: props.concepts,
        name: 'conceptos',
        required: false
    })

    this.notes = validator({
        type: 'string',
        value: props.notes,
        name: 'notas',
        required: false
    })

    this.subtotal = validator({
        type: 'number',
        value: props.subtotal,
        name: 'subtotal',
        required: false
    })

    this.tax = validator({
        type: 'number',
        value: props.tax,
        name: 'impuestos',
        required: false
    })

    this.discount = validator({
        type: 'number',
        value: props.discount,
        name: 'descuentos',
        required: false
    })

    this.total = validator({
        type: 'number',
        value: props.total,
        name: 'total',
        required: false
    })

    this.invoiceDate = validator({
        type: 'date',
        value: props.invoiceDate,
        name: 'fecha de la factura',
        required: false
    })

    this.dueDate = validator({
        type: 'date',
        value: props.dueDate,
        name: 'fecha de vencimiento de la factura',
        required: false
    })

    return this
}

module.exports = Fields