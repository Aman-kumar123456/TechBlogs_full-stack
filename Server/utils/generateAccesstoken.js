import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateAccesstoken=async(userId)=>{
const token= jwt.sign({id:userId},
    process.env.ACCESS_TOKEN_SECRET_KEY,
    {expiresIn:'5h'}
)
return token;
} 

export default generateAccesstoken;