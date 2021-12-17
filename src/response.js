const Messages = require('./messages')

module.exports = {
    $data,
    $error,
    $file,
    $redirect
}

function $data(data, res) {
    res.status(200).send({
        success: true,
        data
    })
}

function $error(error, res) {

    if(!error)
        error = Messages().serverError

    if(error.stack) {
        console.log(error.stack, true)
        error = Messages(error.stack).serverError
    } else
        console.log(error, true)

    res.status(error.code).send({
        success: false,
        error
    })
}

function $file(data, res) {
    res.setHeader('Content-Type', data.contentType)
    res.send(data.file)
}

function $redirect(url, res) {
    res.redirect(url)
}