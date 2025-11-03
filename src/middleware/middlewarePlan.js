const { buscarIdplan } = require("../models/plan.models")

const checkPlan = async (req, res, next) => {
    const { id } = req.params
    const planSelect = await buscarIdplan(id)

    if (planSelect.length === 0) {
        res.status(404).json({ msg: "El plan a modificar no existen" })
    }
    next()
}
const checkplanRegister = async (req, res, next) => {
    const { fk_plan } = req.body
    if(isNaN(fk_plan)){
        return res.status(400).json({msg:"El id del plan debe ser un numero"})
    }
    const planSelect = await buscarIdplan(fk_plan)

    if (planSelect.length === 0) {
        res.status(404).json({ msg: "El plan no exite" })
    }
    next()
}
module.exports = { checkPlan, checkplanRegister }