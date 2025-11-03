// conexion con la base de datos
const mysql= require("mysql2");

// pull de conexion -> creacion de hilos que conectan a las bd 

const pool= mysql.createPool({
    user:process.env.USER_DB,
    port:process.env.PORT_DB,
    password:process.env.PASSWORD_DB,
    host:process.env.HOST_DB,
    database:process.env.NAME_DB
})

module.exports= pool.promise()