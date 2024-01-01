const mongoose=require('mongoose')


const ListingSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    regularPrice:{
        type:Number,
        required:true,
    },
    discountedPrice:{
        type:Number,
        required:true,
    },
    bathroom:{
        type:Number,
        required:true,
    },
    bedroom:{
        type:Number,
        required:true,
    },
    furnished:{
        type:Boolean,
        required:true,
    },
    parking:{
        type:Boolean,
        required:true,
    },
    type:{
        type:String,
        required:true,
    },
    offer:{
        type:Boolean,
        required:true,
    },
    imageUrls:{
        type:Array,
        required:true
    },
    userRefs:{
        type:String,
        required:true
    }
},{timestamps:true})

const Listing=mongoose.model('Listing',ListingSchema)

module.exports=Listing