
module.exports = function($details, $message) {
    return {

        invoiceSaveError: {
            key: 'invoiceSaveError',
            code: 503,
            message: $message || 'Error al guardar la información de la factura',
            $details
        },

        invoiceGetError: {
            key: 'invoiceGetError',
            code: 503,
            message: $message || 'Error al obtener la información de la factura',
            $details
        },

        invoiceDeleteError: {
            key: 'invoiceDeleteError',
            code: 503,
            message: $message || 'Error al borrar la información de la factura',
            $details
        },

        invoiceNotFound: {
            key: 'invoiceNotFound',
            code: 404,
            message: $message || 'El registro de la factura no fue encontrado',
            $details
        },

        invoiceIdRequired: {
            key: 'invoiceIdRequired',
            code: 400,
            message: $message || 'El identificador de facturama es requerido',
            $details
        }
    }
}
