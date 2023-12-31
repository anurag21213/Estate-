// const { timeStamp } = require('console')
const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    avatar:{
        type:String,
        default:"https://th.bing.com/th/id/OIP.EVCGXvrjsvMrhfOX3su_FgHaHa?w=193&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7"
    }

},{timestamps:true})

const UserModel=mongoose.model('User',userSchema)
module.exports =UserModel