import express from "express";
import { signup, logout, login,onboard } from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";
const router=express.Router()


router.post("/signup",signup);
router.post("/login",login);
router.post("/logout",logout);

//Not Everyone can visit this page only users who are authenthicated , Also they can update their name here which will also be updated the DB
router.post("/onBoarding",protectRoute,onboard);

//check if user is logged in
router.get("/me", protectRoute, (req,res)=>{
    res.status(200).json({success: true, user: req.user });
})
export default router;