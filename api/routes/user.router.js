const express=require('express')
const { updateUserConroller, deleteUserController, } = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')

const router=express.Router()



router.post('/update/:id',verifyToken,updateUserConroller)
router.delete('/delete/:id',verifyToken,deleteUserController)

module.exports=router