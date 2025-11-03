const pool = require("../config/conex")
//async para experar la respuesta de la db
const insertClient= async(client)=>{
    const {nombre, email, password, fk_plan}=client;
    const insert="INSERT INTO clientes(nombre, email, password, fk_plan)values(?,?,?,?)";
    const [result]= await pool.query(insert, [nombre, email, password, fk_plan]);
    return result
}
const selectClient= async()=>{
    const select="SELECT * FROM cliente"
    const [result]=await pool.query(select)
    return result
}
const deleteById=async(id)=>{
    const sqlDelete='DELETE FROM cliente WHERE idcliente = ?';
    const [result]= await pool.query(sqlDelete,[id])
    return result
}
const buscarId=async (id) => {
    const select="SELECT * FROM cliente WHERE idcliente = ?"
    const [result]= await pool.query(select,[id])
    return result;
    
}
const buscarEmail=async (email) => {
    const select="SELECT * FROM cliente WHERE email = ?"
    const [result]= await pool.query(select,[email])
    return result;
    
}

const updateById=async(id, client)=>{
    const updateCliente= "UPDATE cliente SET nombre=?,password=?,email=? WHERE idclientes=?"
    const [result]= await pool.query(updateCliente,[client.nombre,client.password,client.email,id])
    return result
}
const selectTrainingClient = async (idClient)=>{
    const sql =`select e.nombre as Nombre_entre, c.nombre  as Nombre_cli
    From entrenador as e inner join  entrenador_clients as ec on e.identrenador = ec.fk_entrenador
    inner join cliente as c on c.idcliente = ec.fk_cliente
    where c.idcliente=? `
    const result= await pool.query(sql,idClient)
    return result
}



module.exports={insertClient, selectClient, deleteById, updateById, buscarId, buscarEmail, selectTrainingClient}