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


module.exports = { createListing, deleteListingController }