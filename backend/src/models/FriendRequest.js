import mongoose from "mongoose";

const friendRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted"],  //Friend request can be pending state and accepted state don't have rejected one's here
      default: "pending",    //default toh pending hi hogi 
    },
  },
  {
    timestamps: true,
  }
);

const FriendRequest = mongoose.model("FriendRequest", friendRequestSchema);

export default FriendRequest;