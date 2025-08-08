const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

//user registerController

exports.signupUser=  async (req, res) => {
    try {
        // Extract user data from request body
        const { username, password, email } = req.body;

        // Validate input data
        if (!username || !password || !email) {
            return res.status(400).json({
                 message: 'All fields are required',
                 error:true,
                 success:false
                 });
        }
// does the username or email exists
const user=await User.findOne({ $or: [{ username }, { email }] });
if(user){
    return res.status(400).json({
        message: 'Username or email already exists',
        error: true,
        success: false
    });
}




const hashpassword= await bcrypt.hash(password, 10);
        // Create a new user instance



const newUser = new User({
            username,
            password:hashpassword, // Note: Password should be hashed before saving in production
            email
        });
 await newUser.save();


        // Respond with success message
        return res.status(200).json({
            message: 'User created successfully',
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


//user LoginController

exports.loginUser=  async (req, res) => {
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

// check cookie








exports.checkCookie=(req,res)=>{
try {
    const token= req.cookies.Amanblogs;
    if(token){
        return res.status(200).json({
            message:"valid token",
            error:false,
            success:true,
        })
    }
    return res.status(200).json({
        message:false,
    })
} catch (error) {
    // consoile.log(error);
    return res.status(500).json({
        message:"Internal server error",
        error:true,
        success:false,
    })
}
}





// logout controller

exports.logoutUser=(req,res)=>{
    try {
        res.clearCookie("Amanblogs",{
            httpOnly:true,
            secure:true,
            sameSite:"None",
            path:"/"
        })

        return res.status(200).json({
            message:"Logged out successfully"
        })
    } catch (error) {
        return res.status(500).json({
            message:"Internal server error",
            error:true,
            success:false,
        }) 
    }
}

// getProfiledata controller




// exports.getProfiledata=(req,res)=>{
// try {
//     const {user}=req;

// } catch (error) {
//      return res.status(500).json({
//             message:"Internal server error",
//             error:true,
//             success:false,
//         }) 
// }
// }

exports.getProfiledata = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      return res.status(401).json({
        message: "Unauthorized",
        error: true,
        success: false,
      });
    }
    // Fetch user details from DB (optional, for fresh data)
    const userData = await User.findById(user.id).select('-password');
    // console.log(userData);
    return res.status(200).json({
      message: "User data fetched successfully",
      error: false,
      success: true,
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      error: true,
      success: false,
    });
  }
}








// change password




exports.ChangeUserpassword=async(req,res)=>{
try {
    const {user}=req;
const {password,newPassword,confirmNewpassword}=req.body;
if(newPassword !== confirmNewpassword){
    return res.status(400).json({
        message:"New Password And confirm New password are not same"
    });
}
const Actualpassword=user.password;
const checkpassword=await bcrypt.compare(password,Actualpassword);
if(!checkpassword){
    return res.status(400).json({
        message: 'password is not valid',
        error: true,
        success: false
    });
}



user.password=await bcrypt.hash(newPassword,10);
await user.save();
return res.status(200).json({
    message:"password changed successfully",
    error:false,
    success:true,
    // data:user.password,
})
} catch (error) {
    console.log(error);
     return res.status(500).json({
            message:"Internal server error",
            error:true,
            success:false,
        }) 
}
}

// change avatar




exports.changeavatar=async(req,res)=>{
   try {
           const {user}=req;
           if(!req.file){
            return res.status(400).json({
                message:"No image file uploaded"
            });
           }
        //    console.log(req.file.path);
           user.avatar=req.file.path
           await user.save();
        // const image = req.file  // multer middleware

        // const upload = await uploadImageClodinary(image)
        
        // const updateUser = await UserModel.findByIdAndUpdate(userId,{
        //     avatar : upload.url
        // })

        return res.json({
            message : "Avatar updated",
            success : true,
            error : false,
            // data : {
            //     _id : user._id,
            //     avatar : upload.url
            // }
        })

    } catch (error) {
        return res.status(500).json({
            message : "Internal server error",
            error : true,
            success : false
        })
    }
}








// fetch favourite blogs.




exports.fetchFavourite =async(req,res)=>{
try {
    const {user}=req;
    const populateUser=await User.findById(user._id).populate('favouriteBlogs')
const favouriteBlogs=populateUser.favouriteBlogs

res
  .status(200)
  .json({ success: true,favouriteBlogs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}




// fetch likes blogs.


exports.fetchlikeblogs =async(req,res)=>{
try {
    const {user}=req;
    const populateUser=await User.findById(user._id).populate('likedBlogs')
const likedBlogs=populateUser.likedBlogs

res
  .status(200)
  .json({ success: true,likedBlogs });
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });

    }
}






