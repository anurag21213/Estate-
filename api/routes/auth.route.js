const express=require("express")
const {signupController,signInController, googleController} = require("../controllers/signupController")

const router=express.Router()

//signup route

router.post('/signup',signupController)

//signin route
router.post('/signin',signInController)

//google route
router.post('/google',googleController)

module.exports=router