import User from "../models/User.js";
import FriendRequest from "../models/FriendRequest.js";

export async function getRecommendedUsers(req,res){
    try{
        const currentUserId=req.user.id;
        const currentUser=req.user;

        const getRecommendedUsers=await User.find({
            $and:[
                {_id: {$ne: currentUserId}}, //exclude current user
                {_id: {$nin: currentUser.friends}}, // exclude current user's friends
                {isOnboarded:true}
            ]
        })
        res.status(200).json(getRecommendedUsers);
    }
    catch(error){
        console.error("Error in getRecommendedUsers controller ",error.message);
        res.status(500).json({ message: "Internal Server Error"});
    }
}

export async function getMyFriends(req,res){
    try{
        const user=await User.findById(req.user.id).select("friends").populate("friends","fullName profilePic nativeLanguage learningLanguage ");  // Humne User model mein friends array banaya tha toh here we are using populate method  taki hum sbb kush populate krwa ske user ka not not id or name

        res.status(200).json(user.friends); // we are sending jo bhi populate kra
    }
    catch(error){
        console.error("Error in getMyFriends controller ", error.message);
        res.status(500).json({message: "Internal Server Error"});
    }
}


export async function sendFriendRequest(req,res){
    try{
        const myId=req.user.id;
        const {id: recipientId}=req.params;   //id ko recipient id se replace kr diya 

        //prevent send req to yourself
        if(myId === recipientId){
            return res.status(400).json({message: "You can't send friend request to yourself "});
        }

        const recipient=await User.findById(recipientId)
        if(!recipient){
            return res.status(404).json({message: "User not found"});
        }

        //check if user is already friends
        if(recipient.friends.includes(myId)){
            return res.status(400).json({message: "You are already Friends with this user"});
        }
        //check if a req already exists
        const existingRequest=await FriendRequest.findOne({
            $or:[
                {sender:myId, recipient:recipientId},
                {sender: recipientId, recipient:myId},
            ],
        });

        if(existingRequest){
            return res.status(400).json({message: "A friend request already exits between you and this user"});
        }  // agr nahi toh we can create new FriendRequest

        const friendRequest= await FriendRequest.create({
            sender:myId,
            recipient:recipientId,
        });
        res.status(201).json(friendRequest);
    }
    catch(error){
        console.error("Error in sendFriendRequest controller ",error.message);
        res.status(500).json({message: "Internal server Error"});
    }
}

export async function acceptFriendRequest(req,res){
    try{
        const {id:requestId}=req.params
        const friendRequest=await FriendRequest.findById(requestId);
        
        if(!friendRequest){
            return res.status(404).json({message:"Friend Request not found"});
        }

        //Verify if the Current User is the Recipient 
        if(friendRequest.recipient.toString()!==req.user.id){
            res.status(403).json({message:"You are not authorized to accept this request"});
        }

        //If not then simply say 
        friendRequest.status="accepted";
        await friendRequest.save();

        //Now add each user to the other Friends Array
        //$addtoSet :- method add eles to an array only of they don not already exits.

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends: friendRequest.recipient},
        });

        await User.findByIdAndUpdate(friendRequest.recipient,{
            $addToSet:{friends: friendRequest.sender},
        });

        res.status(200).json({message:"Friend request accepted"});
    }
    catch(error){
        console.log("Error in acceptFriendRequest controller",error.message);
        res.status(500).json({message:"Internal Server Error "});
    }
}


export async function getFriendRequests(req, res) {
  try {
    const incomingReqs = await FriendRequest.find({
      recipient: req.user.id,
      status: "pending",
    }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

    const acceptedReqs = await FriendRequest.find({
      sender: req.user.id,
      status: "accepted",
    }).populate("recipient", "fullName profilePic");

    res.status(200).json({ incomingReqs, acceptedReqs });
  } catch (error) {
    console.log("Error in getPendingFriendRequests controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getOutgoingFriendReqs(req,res) {
    try {
        const outgoingRequests= await FriendRequest.find({
            sender: req.user.id,
            status:"pending",
        }).populate("recipient","fullName profilePic nativeLanguage learningLanguage");
        res.status(200).json(outgoingRequests);
    }
    catch (error) {
        console.log("Error in getOutgoingFriendReqs controller",error.message);
        res.status(500).json({meassage:"Internal Server Error"});
    }
}