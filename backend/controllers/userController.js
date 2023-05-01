const catchAsyncError = require("../middleware/catchAsyncError");
const ErrorHandler = require("../utils/errorhandler");
const User= require("../models/userModels");
const sendToken = require("../utils/jwttoke.");

//Register a user

exports.registerUser=catchAsyncError(async(req,res,next)=>{
    const{name,email,password}=req.body
    const user=await User.create({
        name,email,password,avatar:{
            public_id:"this is a sample id",
            url:"profilepicurl"
        },
        
    })
    sendToken(user,201,res)
})


//Login User
exports.loginUser=catchAsyncError(async(req,res,next)=>{
    const {email,password}=req.body;
    //Checking if user has given password and email both
    if(!email || !password){
        return next(new ErrorHandler("Please Enter Email and Password",400))
    }
    const user=await User.findOne({email}).select("+password");
    if(!user){
        return next(new ErrorHandler("Invalid email or password",401))

    }
    const isPasswordMatched= await user.comparePassword(password);
    if(!isPasswordMatched){
        return next(new ErrorHandler("Invalid email or password",401))
    }
   sendToken(user,200,res)
})


//Logout User



