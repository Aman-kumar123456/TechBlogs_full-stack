const User = require('../models/user.model');
const Category = require('../models/category.model');
const Blog = require('../models/blog.model');









// add category controller
exports.addCategory=async(req,res)=>{
try {
    const {title}=req.body;
    const checkCat = await Category.findOne({ title });

if (checkCat) {
  return res.status(400).json({ error: "Category already exists" });
}

const newCat = new Category({ title });
await newCat.save();

return res.status(200).json({ success: true, message: "Category added" });
} catch (error) {
        return res.status(500).json({ 
                message: 'Internal server error',
                error: true,
                success: false
            });
}
}








// get category controller
exports.getcategory=async(req,res)=>{
try {
    const categories = await Category.find();

return res.status(200).json({ success: true, categories });
} catch (error) {
        return res.status(500).json({ 
                message: 'Internal server error',
                error: true,
                success: false
            });
}
}


//get blogs by category

exports.getcategoryblogs=async(req,res)=>{
try {
    const {id}=req.params
    const categories = await Category.findById(id).populate('blogs');
    if (!categories) {
      return res.status(404).json({
        message: 'Category not found',
        error: true,
        success: false
      });
    }

return res.status(200).json({ success: true, categories });
} catch (error) {
        return res.status(500).json({ 
                message: 'Internal server error',
                error: true,
                success: false
            });
}
}







//get category by its Id