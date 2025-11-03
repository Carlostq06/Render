const router= require("express").Router()
const { addnewClient, getClients, deleteClient, updateCliente, registerClient, login, getEntrenador_ClientByID, renderTemplate, renderTemplateById,  } = require("../../controllers/client.controllers")
const { checkplanRegister } = require("../../middleware/middlewarePlan")
const upload = require("../../middleware/upload")

router.post("/client", addnewClient)
router.get("/client", getClients)
router.put("/client/:id", updateCliente)
router.delete("/client/:id", deleteClient)


// **registro, y login
router.post("/register", upload.single('image') ,checkplanRegister, registerClient)
router.post("/login",login)
router.get("/entrenador/:id", getEntrenador_ClientByID)
// renderizar vistas de ejs

router.get("/plantilla", renderTemplate)
router.get("/plantilla/client/:id", renderTemplateById)




module.exports=router;
