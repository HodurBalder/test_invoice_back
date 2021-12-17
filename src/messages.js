module.exports = function($details, $message) {
    return {

        routeNotFound: {
            code: 404,
            key: 'routeNotFound',
            message: 'La ruta no fue encontrada',
            $details
        },

        serverError: {
            code: 500,
            key: 'serverError',
            message: $message || 'Error en el servidor',
            $details
        },

        tokenRequired: {
            code: 401,
            key: 'tokenRequired',
            message: $message || 'El token de acceso es requerido',
            $details
        },

        tokenExpired: {
            code: 401,
            key: 'tokenExpired',
            message: $message || 'El token de acceso ha expirado',
            $details
        },

        tokenNotValid: {
            code: 401,
            key: 'tokenNotValid',
            message: $message || 'El token de acceso no es valido',
            $details
        },

        accessRequired: {
            code: 401,
            key: 'accessRequired',
            message: 'Se require token de acceso',
            $details
        },

        accessAdmin: {
            code: 401,
            key: 'accessAdmin',
            message: 'Acceso restringido',
            $details
        },

        userDisabled: {
            code: 401,
            key: 'userDisabled',
            message: 'Cuenta desabilitada',
            $details
        },
    }
}