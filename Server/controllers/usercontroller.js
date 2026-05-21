import UserModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import generateAccesstoken from "../utils/generateAccesstoken.js";
import generateRefreshtoken from "../utils/generateRefreshtoken.js";
import uploadImageClodinary from "../utils/uploadCloudinaryImage.js";
// import jwt from 'jwt'

// register user controller.....
export async function registerUser(request, response) {
  try {
    const { name, email, password } = request.body;

    if (!name || !email || !password) {
      return response.status(400).json({
        message: "provide email, name, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (user) {
      return response.json({
        message: "Already register email",
        error: true,
        success: false,
      });
    }

    const passwordhash = await bcryptjs.hash(password, 10);

    const payload = {
      name,
      email,
      password: passwordhash,
    };

    const newUser = new UserModel(payload);
    const save = await newUser.save();

    return response.json({
      message: "User register successfully",
      error: false,
      success: true,
      data: save,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// login user controller.....
export async function loginUserController(request, response) {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      return response.status(400).json({
        message: "provide email, password",
        error: true,
        success: false,
      });
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return response.json({
        message: "User Not Register",
        error: true,
        success: false,
      });
    }

    const passwordhash = await bcryptjs.compare(password, user.password);

    if (!passwordhash) {
      return response.status(400).json({
        message: "Check your password",
        success: false,
        error: true,
      });
    }

    const accesstoken = await generateAccesstoken(user._id);
    const refreshtoken = await generateRefreshtoken(user._id);

    const cookieoption = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };
    response.cookie("accesstoken", accesstoken, cookieoption);
    response.cookie("refreshtoken", refreshtoken, cookieoption);

    return response.json({
      message: "User Login successfully",
      error: false,
      success: true,
      data: {
        accesstoken,
        refreshtoken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      success: false,
      error: true,
    });
  }
}

// logout user controller.....

export async function logoutUsercontroller(request, response) {
  try {
    const userid = request.userId; //middleware

    const cookiesOption = {
      httpOnly: true,
      secure: false,
      sameSite: "Lax",
    };

    response.clearCookie("accesstoken", cookiesOption);
    response.clearCookie("refreshtoken", cookiesOption);

    return response.json({
      message: "Logout successfully",
      error: false,
      success: true,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// upload avatar contrtoller.....

export async function uploadUseravatar(request, response) {
  try {
    const userId = request.userId; // auth middlware
    const image = request.file; // multer middleware

    const upload = await uploadImageClodinary(image);

    const updateUser = await UserModel.findByIdAndUpdate(userId, {
      avatar: upload.url,
    });

    return response.json({
      message: "upload profile",
      success: true,
      error: false,
      data: {
        _id: userId,
        avatar: upload.url,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// update user details.....

export async function userdetailsupdatecontroller(request, response) {
  try {
    const userId = request.userId;
    const { name, email, password } = request.body;

    let hashpassword;

    if (password) {
      hashpassword = await bcryptjs.hash(password, 10);
    }

    const updateuserdetails = await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        ...(name && { name: name }),
        ...(email && { email: email }),
        ...(password && { password: hashpassword }),
      },
      { new: true },
    );

    return response.json({
      message: "User details updated successfully",
      error: false,
      success: true,
      data: updateuserdetails,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// generated new accesstoken using refresh token......

export async function refreshtokencontroller(request, response) {
  try {
    const refreshtoken =
      request.cookies.refreshtoken ||
      request?.headers?.authorization?.split(" ")[1]; /// [ Bearer token]
    if (!refreshtoken) {
      return response.status(400).json({
        message: "Invalid token",
        error: true,
        success: false,
      });
    }
    const verifytoken = await jwt.verify(
      refreshtoken,
      process.env.REFRESH_TOKEN_SECRET_KEY,
    );

    if (!verifytoken) {
      return response.status(400).json({
        message: "token is expired",
        error: true,
        success: false,
      });
    }

    const userId = verifytoken.id;

    const newaccesstoken = generateAccesstoken(userId);
    const cookieoption = {
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };
    response.cookie("accesstoken", newaccesstoken, cookieoption);

    return response.json({
      message: "newtoken generated successfully",
      success: true,
      error: false,
      data: {
        accesstoken: newaccesstoken,
      },
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}

// get user details controller here.....

export async function getUserdetailscontroller(request, response) {
  try {
    const userId = request.userId;

    const user = await UserModel.findById(userId).select("-password ");
    // console.log("userDetails ",user);
    if (!user) {
      return response.status(400).json({
        message: "user not exist",
        error: true,
        success: false,
      });
    }
    return response.json({
      message: "user details got successfully",
      error: false,
      success: true,
      data: user,
    });
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
}
