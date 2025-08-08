const router=require('express').Router();
const usercontroller=require('./../controllers/usercontroller'); // Import the user controller
const authmiddleware=require('../middleware/authmiddleware');
const upload=require('../middleware/Imageupload');
//signup api
router.post('/signup',usercontroller.signupUser); // Route for user signup
//login api
router.post('/login',usercontroller.loginUser)
//check cookie
router.get('/checkCookie',usercontroller.checkCookie);
// logout api
router.post('/logout',usercontroller.logoutUser);
//userdetails api
router.get('/userdetail',authmiddleware.verifyToken,authmiddleware.authorization("user"),usercontroller.getProfiledata);
//update password api.
router.patch('/updatepassword',authmiddleware.verifyToken,authmiddleware.authorization("user"),usercontroller.ChangeUserpassword);
// change Avatar
router.put('/changeavatar',authmiddleware.verifyToken,authmiddleware.authorization("user"),upload.single('image'),usercontroller.changeavatar);
// fetch favourite
router.get('/fetchfavourite',authmiddleware.verifyToken,authmiddleware.authorization("user"),usercontroller.fetchFavourite);
// fetch likes blogs.
router.get('/fetchlikeblog',authmiddleware.verifyToken,authmiddleware.authorization("user"),usercontroller.fetchlikeblogs);

module.exports=router;