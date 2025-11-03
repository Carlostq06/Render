const express= require("express");
const cors= require("cors");
const dotenv= require("dotenv");
const cloudinary= require("cloudinary").v2;
dotenv.config()
const router = require("./src/routes/api.routes");

cloudinary.config({
    cloud_name: process.env.NAME_CLOUD,
    api_key: process.env.API_KEY_CLOUD,
    api_secret: process.env.API_SECRET_CLOUD
});

const server= express();
server.use(cors())
server.use(express.json())
server.set("view engine", "ejs");
server.use("/api", router)

server.listen(process.env.PORT,()=> {
    console.log(`Servidor ejecutando http://localhost:${process.env.PORT}`);
})

// servidor estatico
server.use(express.static("./web/dist"))




