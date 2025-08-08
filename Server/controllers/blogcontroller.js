const Blog = require('../models/blog.model');
const USER=require("../models/user.model");
const jwt = require('jsonwebtoken');








// fetch all blogs controller
exports.fetchAllblog = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdA: -1 })
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}




// fetch recents blogs.


exports.fetchrecenrblog = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdA: -1 }).limit(4)
        res.status(200).json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
    }
}



// get description of blog by id.



exports.getDescription = async (req, res) => {
    try {
                const token = req.cookies.Amanblogs;

         const decoded = jwt.verify(token, process.env.JWT_SECRET);

                    const user = await USER.findById(decoded.id);
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(400).json({ error: "No blog found" });
        }

let favourite=false;

        if(user && blog.favouriteBlogByUsers.includes(user._id)){
favourite=true;
        }


        let like=false;

        if(user && blog.LikedBlogByUsers.includes(user._id)){
like=true;
        }
        res.status(200).json({ success: true, blog,favourite,like });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}




//add blogs to favourites

exports.addBlogsTofavourite =async(req,res)=>{
try {
    const {user}=req;

        const { id } = req.params;

const blog = await Blog.findById(id);
const existinguser = await USER.findById(user._id);

if (!blog) {
  res.status(400).json({ error: "No blog found" });
}

blog.favouriteBlogByUsers.push(user._id);
existinguser.favouriteBlogs.push(id);
await blog.save();
await existinguser.save();

res
  .status(200)
  .json({ success: true, message: "Blog added to favourites" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}








// remove blog from favourites









exports.removeBlogsfromfavourites =async(req,res)=>{
try {
    const {user}=req;

        const { id } = req.params;

const blog = await Blog.findById(id);
const existinguser = await USER.findById(user._id);

if (!blog) {
  res.status(400).json({ error: "No blog found" });
}

const userFavouriteIndex = existinguser.favouriteBlogs.indexOf(id);
if (userFavouriteIndex !== -1) {
  existinguser.favouriteBlogs.splice(userFavouriteIndex, 1);
} else {
  return res
    .status(400)
    .json({ error: "Blog is not in user's favourites" });
}



const blogFavouriteIndex = blog.favouriteBlogByUsers.indexOf(user._id);
if (blogFavouriteIndex !== -1) {
  blog.favouriteBlogByUsers.splice(blogFavouriteIndex, 1);
}
await blog.save();
await existinguser.save();

res
  .status(200)
  .json({ success: true, message: "Blog removed from favourites" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}








// add blogs to likes


exports.addblogstoLikes =async(req,res)=>{
try {
    const {user}=req;

        const { id } = req.params;

const blog = await Blog.findById(id);
const existinguser = await USER.findById(user._id);

if (!blog) {
  res.status(400).json({ error: "No blog found" });
}

blog.LikedBlogByUsers.push(user._id);
existinguser.likedBlogs.push(id);
await blog.save();
await existinguser.save();

res
  .status(200)
  .json({ success: true, message: "Blog added to Likes" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}

// dislike blogs and remove from Likes


exports.removeblogfromLikes =async(req,res)=>{
try {
    const {user}=req;

        const { id } = req.params;

const blog = await Blog.findById(id);
const existinguser = await USER.findById(user._id);

if (!blog) {
  res.status(400).json({ error: "No blog found" });
}

const userLikesIndex = existinguser.likedBlogs.indexOf(id);
if (userLikesIndex !== -1) {
  existinguser.likedBlogs.splice(userLikesIndex, 1);
} else {
  return res
    .status(400)
    .json({ error: "Blog is not in user's Likes" });
}



const blogLikeIndex = blog.LikedBlogByUsers.indexOf(user._id);
if (blogLikeIndex !== -1) {
  blog.LikedBlogByUsers.splice(blogLikeIndex, 1);
}
await blog.save();
await existinguser.save();

res
  .status(200)
  .json({ success: true, message: "Blog removed from Likes" });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}








//fetch likes blogs.






// // fetch favourite blogs. is in  usercontroller




// exports.fetchFavourite =async(req,res)=>{
// try {
//     const {user}=req;

//         const { id } = req.params;

// const blog = await Blog.findById(id);
// const existinguser = await USER.findById(user._id);

// if (!blog) {
//   res.status(400).json({ error: "No blog found" });
// }

// blog.favouriteBlogByUsers.push(user._id);
// existinguser.favouriteBlogs.push(id);
// await blog.save();
// await existinguser.save();

// res
//   .status(200)
//   .json({ success: true, message: "Blog added to favourites" });
//     } catch (error) {
//         res.status(500).json({ error: "Internal server error" });

//     }
// }




// Edit blogs or Update blogs








exports.EditBlogs =async(req,res)=>{
try {

        const { id } = req.params;
const {title,description}=req.body;
const blog = await Blog.findByIdAndUpdate(id,{title,description});
await blog.save();



res
  .status(200)
  .json({ success: true, message: "Blog UPdated Successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}

// delete a particular  blogs

exports.deleteblogs =async(req,res)=>{
try {

        const { id } = req.params;
 await Blog.findByIdAndDelete(id);



res
  .status(200)
  .json({ success: true, message: "Blog deleted Successfully." });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}