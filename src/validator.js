const Moment = require('moment')
const ObjectId = require('mongoose').Types.ObjectId

function validator(options) {

    const $this = new Object()

    $this.OPTIONS = {
        VALUE: options.value,
        NAME: options.name,
        TYPE: options.type,
        REQUIRED: options.required != undefined? options.required : true,
        ENUM: options.enum,
    }

    $this.value = value => {
        $this.OPTIONS.VALUE = value
        return $this
    }

    $this.notRequired = () => {
        $this.OPTIONS.REQUIRED = false
        return $this
    }

    $this.get = () => {

        const {ENUM} = $this.OPTIONS

        $type()
        if(ENUM) $enum()
        return $this.OPTIONS.VALUE
    }

    function $type() {

        const {VALUE, TYPE, NAME, REQUIRED} = $this.OPTIONS

        const types = [
            'string',
            'number',
            'integer',
            'file',
            'date',
            'objectId',
            'email',
            'phone',
            'array'
        ]

        const EXISTS = VALUE != null && VALUE != undefined && VALUE != '' || VALUE === 0

        if(types.indexOf(TYPE) === -1)
            return error(`${NAME} no es un tipo de dato valido`)

        if(REQUIRED && EXISTS)
            validType()[TYPE]()

        if(REQUIRED && !EXISTS)
            return error(`${NAME} es un valor requerido`)

        if(!REQUIRED && !EXISTS)
            valueDefault()
    }

    function $enum() {

        const {VALUE, TYPE, NAME, ENUM} = $this.OPTIONS

        if(TYPE === 'file') {

            let valid = false

            ENUM.forEach(item => {
                if(VALUE.type.includes(item))
                    valid = true
            })

            if(valid) return

            return error(`${NAME} el tipo de archivo no es válido`)
        }

        if(ENUM.indexOf(VALUE) == -1)
            return error(`${NAME} no es una opción valida`)
    }

    function valueDefault() {

        const { TYPE, NAME } = $this.OPTIONS

        const texts = ['string', 'email', 'password', 'phone']

        if(texts.indexOf(TYPE) >= 0)
            return $this.OPTIONS.VALUE = ''

        const numbers = ['number', 'integer', 'float']

        if(numbers.indexOf(TYPE) >= 0)
            return $this.OPTIONS.VALUE = 0

        const objs = ['file', 'date', 'objectId']

        if(objs.indexOf(TYPE) >= 0)
            return $this.OPTIONS.VALUE = null

        error(`${ NAME } no es un tipo de dato valido`)

        if(TYPE === 'array')
            return $this.OPTIONS.VALUE = []
    }

    function validType() {

        let {VALUE, NAME} = $this.OPTIONS

        return {

            string: () => {
                $this.OPTIONS.VALUE = `${VALUE || ''}`
            },

            number: () => {

                if(isNaN(VALUE))
                    return error(`${NAME} no es un dato válido, se espera un número`)

                $this.OPTIONS.VALUE = new Number(VALUE)
            },
            file: () => {

                if(!VALUE.path)
                    return error(`${NAME} no es un dato válido, se espera un archivo`)

            },

            date: () => {

                if(!Moment.isDate(new Date(VALUE)))
                    return error(`${NAME} no es un dato válido, se espera una fecha`)

                $this.OPTIONS.VALUE = Moment(VALUE).toDate()
            },
            email: () => {

                let regexp = /^[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/

                if(!regexp.test(VALUE))
                    return error(`${NAME} no es un dato válido, se espera un correo`)

            },

            phone: () => {

                VALUE = `${VALUE || ''}`.replace(/ /, '').replace('+52', '').replace('+(52)', '').replace('(', '').replace(')', '').replace('+', '')

                const regexp = /^([0-9]{10})$/g

                if(!regexp.test(VALUE))
                    return error(`${NAME} no es un dato válido, se espera un número te teléfono a 10 dígitos`)

            },

            objectId: () => {

                if(!ObjectId.isValid(VALUE) || ObjectId(VALUE) != VALUE)
                    return error(`${NAME} no es un dato válido, se espera un identificador`)

                $this.OPTIONS.VALUE = new ObjectId(VALUE)

            },
            array: () => {

                if(!(VALUE instanceof Array))
                    return error(`${NAME} no es un dato válido, se espera un arreglo de elementos`)
            }
        }
    }

    function error(message) {
        throw {
            code: 400,
            key: 'badParams',
            message,
            $details: $this.OPTIONS
        }
    }

    return $this
}

module.exports = validator