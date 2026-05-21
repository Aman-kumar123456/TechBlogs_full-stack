import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateRefreshtoken= async(userId)=>{
const token= jwt.sign({id:userId},
    process.env.REFRESH_TOKEN_SECRET_KEY,
    {expiresIn:'7d'}
)
return token;
} 

export default generateRefreshtoken;