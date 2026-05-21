import { Router } from "express";
import { addBlogcontroller, deleteblogcontroller, editblogcontroller, getallblogcontroller, getBlogByCategoryIdController, getBlogDetailsById, getrecentFirstBlogcontroller, getRecentLimitBlogcontroller } from "../controllers/blogcontroller.js";
import auth from "../middleware/authmiddleware.js";

const blogRouter=Router();

blogRouter.post('/add-blog',addBlogcontroller);
blogRouter.get('/get-blogs',getallblogcontroller);
blogRouter.delete('/delete-blog',auth,deleteblogcontroller);
blogRouter.post('/edit-blog',auth,editblogcontroller);
blogRouter.post('/get-blogdetails',getBlogDetailsById);
blogRouter.get('/get-recentblog',getrecentFirstBlogcontroller);
blogRouter.get('/get-morerecentBlog',getRecentLimitBlogcontroller);
blogRouter.post('/get-categoryId',getBlogByCategoryIdController);

export default blogRouter;