const router=require('express').Router();
const admincontroller=require('./../controllers/admincontroller'); // Import the user controller
const authmiddleware=require('../middleware/authmiddleware');
const upload=require('../middleware/Imageupload');









router.post('/adminlogin',admincontroller.adminLogin)





router.post('/addblog',
    authmiddleware.verifyToken,  
    authmiddleware.authorization("admin"),
    upload.single("image"),
    admincontroller.addblog)



module.exports=router;