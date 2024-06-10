const {v4: uuid} = require("uuid")

function crearUUID(){
    return uuid()
}

module.exports= crearUUID