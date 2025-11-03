const { insertPlan, updateByIdPlan } = require("../models/plan.models");

const addnewPlan= async(req,res)=>{
    try {
        const plan= req.body
        const idInserted= await insertPlan(plan)
        res.status(202).json({ succes: true, id: idInserted })
    } catch (error) {
        console.log(error)
    }
}
const updatePlan=async(req,res)=>{
    try {
        const data = await updateByIdPlan(req.params.id, req.body)
        if (data.affectedRows !== 0) {
            res.status(200).json({ success: true, msg: "plan modificado con exito" })
        }
    } catch (error) {
        res.status(500).json({ success: false, msg: error })
    }
}

module.exports={addnewPlan, updatePlan}