import express from "express"
import { protectRoute } from "../middleware/auth.middleware.js";
import {acceptFriendRequest, getFriendRequests, getMyFriends, getOutgoingFriendReqs, getRecommendedUsers, sendFriendRequest} from "../controllers/user.controller.js";

const router= express.Router();

router.use(protectRoute); //apply auth middleware to all routes

router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.post("/friend-request/:id", sendFriendRequest); //dynamic hai also we will create one more model for this '
router.put("/friend-request/:id/accept",acceptFriendRequest);


router.get("/friend-requests",getFriendRequests);  //So in notification bar i would like to see friend requests also connection req
router.get("/outgoing-friend-requests",getOutgoingFriendReqs); //Hume dikhna chahiye ki humne request send kri hai
export default router;