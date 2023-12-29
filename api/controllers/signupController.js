const UserModel = require("../models/user.model")
// const User = require("../models/user.model")
const bcrypt=require('bcrypt')
const errorHandler = require("../utils/errorHandler")

const jwt=require('jsonwebtoken')


//controller for signup
const signupController=async(req,res,next)=>{
    const {username,email,password}=req.body
    if(!username){
        res.status(500).json({
            success:false,
            message:"invalid username"
        })
    }
    if(!email){
        res.status(500).json({
            success:false,
            message:"invalid email"
        })
    }
    if(!password){
        res.status(500).json({
            success:false,
            message:"invalid password"
        })
    }
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new UserModel({username,email,password:hashedPassword})
    try {
        await newUser.save()
    res.status(201).send({message:"success",success:true})
    } catch (error) {
        next(error)
    }
    
}

//controller for sign in
const signInController=async(req,res,next)=>{
    const {email,password}=req.body
    try {
        const validate=await UserModel.findOne({email})
        if(!validate) return next(errorHandler(404,"User not found"))

        const validatepassword=bcrypt.compareSync(password,validate.password)

        if(!validatepassword){
            return next(errorHandler(401,'wrong credentials!!'))
        }
        const token= jwt.sign({id:validate._id},process.env.JWT_SECRET)
        const {password:pass,...rest}=validate._doc
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)


    } catch (error) {
        next(error)
    }

}

module.exports={signupController,signInController}