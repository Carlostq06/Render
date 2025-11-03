

const { buscarIdplan } = require("../models/plan.models");
const { verifyToken } = require("../utils/jwt")
// se ejecuta de forma intermedia en nuestras rutas
const authClient=(req, res, next)=>{
    try {
        // el token no se manda por el body
        const tokenHeader=req.headers.authorization;
        if(!tokenHeader){
            return res.json({msg:"Inicia Sesion"})
        }
        const token= tokenHeader.split(" ")[1]
        const resultToken= verifyToken(token)
        if(!resultToken){
            return res.json({ msg: "El token es invalido" })
        }
        req.informacionCliente= resultToken
        next()
    } catch (error) {
        console.log(error)
    }

}
const checkAdmin=(req,res,next)=>{
    const {rol}= req.informacionCliente
    if(rol!="A"){
        return res.json({msg:"Debe ser admin"})
    }
    next()
}

module.exports = { authClient, checkAdmin }