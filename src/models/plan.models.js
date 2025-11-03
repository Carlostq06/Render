const pool = require("../config/conex");


const insertPlan= async(plan)=>{
    const {nombre, precio, descripcion}= plan;
    const insert= "INSERT INTO plan(nombre, precio, descripcion) values(?,?,?)"
    const [result]= await pool.query(insert,[nombre, precio, descripcion])
    return result.insertId
}
const updateByIdPlan = async (id, plan) => {
    const updateCliente = "UPDATE plan SET nombre=?,precio=?,descripcion=? WHERE idplan=?"
    const [result] = await pool.query(updateCliente, [plan.nombre, plan.precio, plan.descripcion, id])
    return result
}
const buscarIdplan = async (id) => {
    const select = "SELECT * FROM plan WHERE idplan = ?"
    const [result] = await pool.query(select, [id])
    return result;
}

module.exports = { insertPlan, updateByIdPlan, buscarIdplan }