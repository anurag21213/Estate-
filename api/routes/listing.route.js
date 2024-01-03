const express=require('express')
const { createListing, deleteListingController, updateListingController, getLIstingController } = require('../controllers/listingControllers')
const verifyToken = require('../utils/verifyToken')

const router=express.Router()

router.post('/create',verifyToken,createListing)
router.delete('/delete/:id',deleteListingController)
router.post('/update/:id',verifyToken,updateListingController)
router.get('/getListing/:id',getLIstingController)


module.exports=router