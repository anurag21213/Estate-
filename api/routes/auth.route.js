const express=require("express")
const {signupController,signInController} = require("../controllers/signupController")

const router=express.Router()

//signup route

router.post('/signup',signupController)

//signin route
router.post('/signin',signInController)

module.exports=router