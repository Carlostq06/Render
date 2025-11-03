const router = require("express").Router()
const { addnewPlan, updatePlan } = require("../../controllers/plan.controllers");
const { authClient,checkAdmin } = require("../../middleware/auth");
const { checkPlan } = require("../../middleware/middlewarePlan");


router.post("/", authClient,checkAdmin ,addnewPlan)

router.put("/:id", authClient,checkAdmin, checkPlan ,updatePlan)

module.exports = router;