const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");


const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "gymapp",
        allowed_formats: ["jpg", "png", "jpeg", "gif","svg","webp" ]

    }

});

const upload = multer({ storage: storage });

module.exports = upload;
