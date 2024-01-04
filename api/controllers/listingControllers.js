const Listing = require("../models/listing.model")
const errorHandler = require("../utils/errorHandler")

const createListing = async (req, res, next) => {
    try {
        const listing = await Listing.create(req.body)
        return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}
const deleteListingController = async (req, res, next) => {
    const listing = await Listing.findById(req.params.id)
    
    if (!listing) {
        return next(errorHandler(404, 'Listing not found'))
    }
    // if (req.user.id !== listing.userRefs) {
    //     next(errorHandler(401, 'you are not authorized to delete,you can only delte your listings'))
    // }
    try {
        await Listing.findByIdAndDelete(req.params.id)
        res.status(200).json({message:'listing has been deleted'})
    } catch (error) {
        next(error)
    }
}

const updateListingController=async(req,res,next)=>{
    const listing= await Listing.findById(req.params.id)

    if(!listing){
        return next(errorHandler(404,"Listing not found"))
    }
    if(req.user.id!==listing.userRefs){
        return next(errorHandler(401,"You can only update you listings"))
    }

    try {
       const updatedListing= await Listing.findByIdAndUpdate(req.params.id,req.body,{new:true})
       res.status(200).json(updatedListing)
    } catch (error) {
        next(error)
    }

}

const getLIstingController=async(req,res,next)=>{
   try {
     const listingData=await Listing.findById(req.params.id)
     if(!listingData){
        return next(404,'LIsting not found')
     }
     
     res.status(200).json(listingData)
   } catch (error) {
    next(error)
   }
}
const getListings=async(req,res,next)=>{
    try {
        const limit=parseInt(req.query.limit)||9
        const startIndex=parseInt(req.query.startIndex)||0
        let offer=req.query.offer

        if(offer===undefined||offer==='false'){
            offer={$in:[true,false]}
        }

        let furnished=req.query.furnished

        if(furnished===undefined||furnished==='false'){
            furnished={$in:[true,false]}
        }

        let parking=req.query.parking
        if(parking===undefined||parking==='false'){
            parking={$in:[true,false]}
        }

        let type=req.query.type
        if(type==undefined||type==='all'){
            type={$in:['sale','rent']}
        }

        const searchTerm=req.query.searchTerm||''
        const sort=req.query.sort||'createdAt'
        const order=req.query.order||'desc'

        const listings=await Listing.find({
            name:{$regex:searchTerm,$option:'i'},
            offer,
            furnished,
            parking,
            type
        }).sort({[sort]:order}).limit(limit).skip(startIndex)

        return res.status(200).json(listings)


    } catch (error) {
        next(error)
    }
}


module.exports = { createListing, deleteListingController,updateListingController,getLIstingController,getListings }