import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import {acceptFriendRequest, getMyFriends, getRecommendedUsers, sendFriendRequest} from "../controllers/user.controller.js";

const router= express.Router();

router.use(protectRoute); //apply auth middleware to all routes

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id", sendFriendRequest); //dynamic hai also we will create one more model for this '
router.put("/friend-request/:id/accept",acceptFriendRequest);
export default router;