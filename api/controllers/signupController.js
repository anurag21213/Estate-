const UserModel = require("../models/user.model")
// const User = require("../models/user.model")
const bcrypt=require('bcrypt')

const signupController=async(req,res)=>{
    const {username,email,password}=req.body
    const hashedPassword=bcrypt.hashSync(password,10)
    const newUser=new UserModel({username,email,password:hashedPassword})
    try {
        await newUser.save()
    res.status(201).send("done")
    } catch (error) {
        res.status(500).send({message:"Error while singup",error:error.message})
    }
    
}

module.exports=signupController