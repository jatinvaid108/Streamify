import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const userSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },

    bio:{
        type:String,
        default:"",
    },

    profilePic:{
        type:String,
        default:"",
    },
    nativeLanguage:{
        type:String,
        default:"",
    },
    learningLanguage:{
        type:String,
        default:"",
    },

    //Onboarding is necessary as user will not be able to navigate to other pages before onboarding
    isOnboarded:{
        type:Boolean,
        default:false,
    },

    //friend id ki form mein store honge in array
    friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
},{timestamps:true});    //createdAt, updatedAt

//pre hook to hash the password
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();

    try{
        const salt= await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    }
    catch(error){
        next(error);
    }
})



//for login 

userSchema.methods.matchPassword=async function (enteredPassword){
    const isPasswordCorrect=await bcrypt.compare(enteredPassword,this.password);
    return isPasswordCorrect;
};
const User=mongoose.model("User",userSchema);



export default User;