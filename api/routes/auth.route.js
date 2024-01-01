const express=require("express")
const {signupController,signInController, googleController, logoutController} = require("../controllers/signupController")

const router=express.Router()

//signup route

router.post('/signup',signupController)

//signin route
router.post('/signin',signInController)

//google route
router.post('/google',googleController)

//logout 
router.get('/logout',logoutController)

module.exports=router