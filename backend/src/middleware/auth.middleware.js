//In onBoarding process we need to verify jwt cookie assigned during signup/login
// if true grant success else error

import jwt from "jsonwebtoken";
import User from "../models/User.js";


export const protectRoute=async (req,res,next)=>{
    try {
        const token=req.cookies.jwt;

        if(!token){
            return res.status(401).json({message: "Unauthorized - No token provided "});
        }

        const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY);

        if(!decoded){
            return res.status(401).json({message: "Unauthorized - Invalid token "});
        }
        const user=await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message: "Unauthorized - User not found"});
        }

        req.user=user;
        next();   //just called the next part of the code
    }
    catch (error) {
        console.log("Error in protectedRoute middleware",error);
        res.status(500).json({message:"Internal Server Error "});
    }
}