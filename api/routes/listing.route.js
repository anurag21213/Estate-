const express=require('express')
const { createListing, deleteListingController } = require('../controllers/listingControllers')
const verifyToken = require('../utils/verifyToken')

const router=express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',deleteListingController)


module.exports=router