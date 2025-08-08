
 const cloudinary = require("cloudinary").v2;
 const { CloudinaryStorage } = require("multer-storage-cloudinary");

 cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
   api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
 });

 const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
     format: async (req, file) => {
        const fileType=file.mimetype.split("/")[1];
        return ["jpeg","png","jpg"].includes(fileType)?fileType:"png"
     },
     public_id: (req, file) =>
       `${Date.now()}-${file.originalname.split(".")[0]}`,
      },
 });

 module.exports = {
   cloudinary,
   storage,
 };
