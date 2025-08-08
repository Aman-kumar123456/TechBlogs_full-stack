const router=require('express').Router();

const blogcontroller=require('../controllers/blogcontroller');
const authmiddleware=require('../middleware/authmiddleware');








// fetch al blogs api


router.get('/getblogs',blogcontroller.fetchAllblog);
// fetch recents blogs api
router.get('/getrecentblogs',blogcontroller.fetchrecenrblog);
// fetch description by id
router.get('/getdescriptionbyid/:id',blogcontroller.getDescription);
// add blog to favourite
router.put('/addblogatofavourite/:id',authmiddleware.verifyToken,authmiddleware.authorization('user'),blogcontroller.addBlogsTofavourite)
// remove blog from favourites
router.put('/removeblogfromfavourites/:id',authmiddleware.verifyToken,authmiddleware.authorization('user'),blogcontroller.removeBlogsfromfavourites);
// Edit or UPdate Blogs
router.put('/editblogs/:id',authmiddleware.verifyToken,authmiddleware.authorization('admin'),blogcontroller.EditBlogs);
// delete blog
router.put('/deleteblogs/:id',authmiddleware.verifyToken,authmiddleware.authorization('admin'),blogcontroller.deleteblogs);
// blogs add to likes
router.put('/addblogstolikes/:id',authmiddleware.verifyToken,authmiddleware.authorization('user'),blogcontroller.addblogstoLikes)
// dislike blogs and remove from Likes
router.put('/removeblogfromlikes/:id',authmiddleware.verifyToken,authmiddleware.authorization('user'),blogcontroller.removeblogfromLikes);



module.exports=router;