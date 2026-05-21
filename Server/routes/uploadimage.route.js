import {Router} from 'express'
import { uploadimagecontroller } from '../controllers/uploadimagecontroller.js';
import upload from '../middleware/multer.js';
import auth from '../middleware/authmiddleware.js';


const uploadRouter=Router();

uploadRouter.post('/upload-image',auth,upload.single("Techblog") , uploadimagecontroller);

export default uploadRouter;