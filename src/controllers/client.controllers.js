const bcrypt=require("bcrypt")
const { insertClient, selectClient, deleteById, updateById, buscarId, buscarEmail, selectTrainingClient, } = require("../models/client.models");
const { CreateToken } = require("../utils/jwt");

const addnewClient = async(req,res)=>{

    try{
        const emailSelected= await buscarEmail(req.body.email)
        if (emailSelected.length !==0){
            res.status(404).json({msg:"El email ya existe"})
        }
        else{
            const client= req.body;
            console.log(client)
            const resultClient= await insertClient(client)

            res.json({msg:"Todo ok", insertId: resultClient.insertId})
        }
        
    }catch(error){
        console.log(error)
    }
}

const getClients= async(req,res)=>{
    try{
        
        const resultClient= await selectClient()
        res.json(resultClient)

    }catch(error){
        console.log(error)
    }
}

const deleteClient= async(req,res)=>{
    try{
        const {id}= req.params
        const clienteSelect= await buscarId(id)
        if (clienteSelect.length ===0){
            res.status(404).json({msg:"El usuario a eliminar no existen"})
        }else{
            const resultClient= await ç(req.params.id)
            if (resultClient.affectedRows !== 0) {
                res.status(200).json({ success: true, msg: "cliente eliminado con exito" })
            }
           
        }
        
    }catch(error){
        console.log(error)
    }
}


const updateCliente=async(req,res)=>{
    try{
        const {id}= req.params
        const clienteSelect= await buscarId(id)

        if (clienteSelect.length ===0){
            res.status(404).json({msg:"El usuario a modificar no existen"})
        }else{
            const data= await updateById(req.params.id,req.body)
            if (data.affectedRows !==0){
                res.status(200).json({success:true, msg:"cliente modificado con exito"})
            }
            
        }
        
    }catch(error){
        console.log(error)
    }

}

const registerClient=async(req,res)=>{
    try {
        const client= req.body
        const clientDb = await buscarEmail(client.email)
        if(clientDb.length !=0){
            return res.status(400).json({success:false, msg:"El email ya existen"})
        }
        const imagen= req.file.path
        client.password= bcrypt.hashSync(client.password,10)
        const result= await insertClient(client)
        return res.status(202).json({success:true,insertId:result.insertId})//202 algo bien
    } catch (error) {
        res.status(500).json({success:false,msg:error})// errores 500
    }
}
const login=async(req, res)=>{
    try {
        const clientBody= req.body
        const clientDb= await buscarEmail(clientBody.email)
        if (clientDb.length ===0){
            return res.status(404).json({ success: false, msg: "El email no existen" })
        }
        const isSame= bcrypt.compareSync(clientBody.password, clientDb[0].password)
        if (!isSame){
            return res.status(400).json({ success: false, msg: "Contraseña incorrecta" })
        }
        //crear token 
        const token= CreateToken({id:clientDb[0].idclientes, email:clientDb[0].email, rol:clientDb[0].rol})
        return res.status(200).json({ success: true, msg: token })
    } catch (error) {
        return res.status(500).json({ success: false, msg: error })
    }
}

const getEntrenador_ClientByID=async(req, res)=>{
    try {
        const { id } = req.params
        const result = await selectTrainingClient(id)
        res.status(200).json({ success: true, data:result[0]})
    } catch (error) {
        console.log(error)
    }
}

const renderTemplate= async(req,res)=>{
    try {
        res.render("home", {data:["maria","juan","pedro"]})
    } catch (error) {
        
    }
}

// const renderTemplateById= async(req,res)=>{
//     try {
//         const data= [{"id":1, "nombre":"Juan", "email":"prueba@gmail.com"},{"id":2, "nombre":"Pedro", "email":"prueba2@gmail.com"}]
//         const id= data.id
//     } catch (error) {
        
//     }
// }~

const renderTemplateById= async(req,res)=>{
    try {
        const { id } = req.params
        const client = await buscarId(id)
        res.render("clientProfile", {client:client[0]})
    } catch (error) {
     console.log(error)   
    }
}


module.exports = { addnewClient, getClients, deleteClient, updateCliente, registerClient, login, getEntrenador_ClientByID, renderTemplate, renderTemplateById }