const express=require('express')
const { updateUserConroller, deleteUserController, getUserListings, getUser, } = require('../controllers/userController')
const verifyToken = require('../utils/verifyToken')

const router=express.Router()



router.post('/update/:id',verifyToken,updateUserConroller)
router.delete('/delete/:id',verifyToken,deleteUserController)
router.get('/listings/:id',verifyToken,getUserListings)
router.get('/:id',verifyToken,getUser)

module.exports=router