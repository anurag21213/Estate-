const express=require("express")
const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()

const path=require('path')

//cors
const cors=require('cors')
//cookie parser
const cookieParser=require('cookie-parser')

const userrouter=require('./routes/user.router')
const authUser=require('./routes/auth.route')
const listingRouter=require('./routes/listing.route')

const app=express()
const _dirname=path.resolve()
app.use(cors())
app.use(cookieParser())

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
app.use('/api/listing',listingRouter)

app.use(express.static(path.join(_dirname,'/client/dist')))

app.get('*',(req,res)=>{
    res.sendFile(path.join(_dirname,'client','dist','index.html'))
})

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode||500
    const message=err.message||"Interval Server Error"

    return res.status(statusCode).json({
        success:false,
        statusCode,
        message
    })
})


