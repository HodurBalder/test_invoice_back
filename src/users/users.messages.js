module.exports = function($details, $message) {
    return {

        userGetError: {
            code: 500,
            key: 'userGetError',
            message: $message || 'Error al obtener la información del usuario',
            $details
        },

        userSaveError: {
            code: 500,
            key: 'userSaveError',
            message: $message || 'Error al guardar la información del usuario',
            $details
        },

        userNotFound: {
            code: 404,
            key: 'userNotFound',
            message: $message || 'El usuario no fue encontrado',
            $details
        },

        userDisabled: {
            code: 401,
            key: 'userDisabled',
            message: $message || 'Cuenta desabilitada',
            $details
        },

        userPasswordError: {
            code: 401,
            key: 'userPasswordError',
            message: $message || 'La contraseña es incorrecta',
            $details
        },

        userExistsError: {
            code: 400,
            key: 'userExistsError',
            message: $message || 'El usuario ya se encuentra registrado',
            $details
        },
    }
}