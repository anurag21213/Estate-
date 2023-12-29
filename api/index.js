const express=require("express")
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const userrouter=require('./routes/user.router')
const authUser=require('./routes/auth.route')

const app=express()

mongoose.connect(process.env.MONGO).then(()=>{
    console.log("connected succesfully")
}).catch((err)=>{
    console.log(err)
})

app.listen(3000,()=>{
    console.log("Server is running..........")
})

app.use(express.json())
app.use('/api/user',userrouter)
app.use('/api/auth',authUser)

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"Interval Server Error"

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


