import { Router } from "express";
import auth from "../middleware/authmiddleware.js";
import { addToFavouritecontroller, getFavouritecontroller, removeFavouritecontroller } from "../controllers/favouritecontroller.js";


const favouriteRouter=Router();

favouriteRouter.post('/add-favourite',auth,addToFavouritecontroller);
favouriteRouter.get('/get-favourite',auth,getFavouritecontroller);
favouriteRouter.post('/rempve-favourite',auth,removeFavouritecontroller);
export default favouriteRouter;