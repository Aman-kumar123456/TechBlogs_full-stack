
import {Router} from 'express'
import { getUserdetailscontroller, loginUserController, logoutUsercontroller, refreshtokencontroller, registerUser, uploadUseravatar, userdetailsupdatecontroller } from '../controllers/usercontroller.js';
import auth from '../middleware/authmiddleware.js';
import multer from 'multer';
import upload from '../middleware/multer.js';

const userRouter=Router();

userRouter.post('/register-user',registerUser);
userRouter.post('/login-user',loginUserController);
userRouter.get('/logout-user',auth,logoutUsercontroller);
userRouter.post('/upload-avatar',auth,upload.single('Techblog'),uploadUseravatar);
userRouter.put('/update-user-details',auth,userdetailsupdatecontroller);
userRouter.post('/refresh-token',refreshtokencontroller);
userRouter.get('/get-userdetails',auth,getUserdetailscontroller);

export default userRouter;