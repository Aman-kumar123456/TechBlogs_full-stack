const User = require('../models/user.model');
const Blog = require('../models/blog.model');

const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');
const Cat=require('../models/category.model')






// login controller

exports.adminLogin=async(req,res)=>{
        try {
            // Extract user data from request body
            const { password, email } = req.body;
    
            // Validate input data
            if ( !password || !email) {
                return res.status(400).json({
                     message: 'All fields are required',
                     error:true,
                     success:false
                     });
            }
    // does the username or email exists
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message: 'Invalid Crendentials',
            error: true,
            success: false
        });
    }
    
    const checkpassword=await bcrypt.compare(password,user.password);
    if(!checkpassword){
        return res.status(400).json({
            message: 'Invalid Crendentials',
            error: true,
            success: false
        });
    }
    
            // Generate JWT token
            const token = jwt.sign({ id: user._id },
                 process.env.JWT_SECRET, 
                 {  expiresIn: '30d' }
                );
    
    
    
    
                res.cookie('Amanblogs',token,{
                    httpOnly: true,
                    maxAge:30*24*60*60*1000, // 30 days
                    secure:true, // Use secure cookies in production
                    sameSite: 'None' // Prevent CSRF attacks
                })
            // Respond with success message
            return res.status(200).json({
                message: 'User login successfully.',
                error: false,
                success: true,
            });
        } catch (error) {
            return res.status(500).json({ 
                message: 'Internal server error',
                error: true,
                success: false
            });
        }
}



// add-blogs controller

exports.addblog=async(req,res)=>{
try {
    const {title,description,category}=req.body;
    if (!title || !description || !category) {
  return res.status(400).json({ error: "All fields are required" });
}

if (!req.file) {
  return res.status(400).json({ error: "Image is required" });
}
const existingCat=await Cat.findOne({title:category});
if(!existingCat){
      return res.status(400).json({ error: "The category does not exist" });
}

const newBlog = new Blog({ title, description, image: req.file.path  });
await newBlog.save();
existingCat.blogs.push(newBlog._id);
await existingCat.save();
return res.status(200).json({ success: true, message: "Blog Added" });
} catch (error) {
    // console.log(error)
    return res.status(500).json({ 
                message: 'Internal server error',
                error: true,
                success: false
            });
}
}