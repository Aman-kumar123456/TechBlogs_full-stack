
import {Router} from 'express'
import auth from '../middleware/authmiddleware.js';
import { addcategorycontroller, deleteCategoryController, getcategorycontroller } from '../controllers/categorycontroller.js';


const categoryRouter=Router();
categoryRouter.post('/add-category',auth,addcategorycontroller);
categoryRouter.get('/get-category',getcategorycontroller);
categoryRouter.delete('/delete-category',deleteCategoryController);


export default categoryRouter;