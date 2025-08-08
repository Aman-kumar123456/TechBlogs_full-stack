const router=require('express').Router();
const categorycontroller=require('./../controllers/categorycontroller'); // Import the user controller
const authmiddleware=require('../middleware/authmiddleware');






router.post('/addcategory',authmiddleware.verifyToken,authmiddleware.authorization('admin'),categorycontroller.addCategory);
router.get('/getcategory',categorycontroller.getcategory)
router.get('/getcategoryblogs/:id',categorycontroller.getcategoryblogs)


module.exports=router;