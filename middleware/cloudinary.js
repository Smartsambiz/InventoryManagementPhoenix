// middleware/cloudinary.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); 
const cloudinary = require("../configs/cloudinaryConfig");

// Multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "inventoryFolder", // folder in your Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const upload = multer({ storage });

module.exports = upload;