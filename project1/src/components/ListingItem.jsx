import React from 'react'
import { Link } from 'react-router-dom'
import {MdLocationOn} from 'react-icons/md'


const ListingItem = ({listing}) => {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden sm:w-[330px] w-full rounded-lg'>
     <Link to={`/listing/${listing._id}`}>
       <img src={listing.imageUrls[0]} alt='listing img' className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300' />
       <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold text-slate-700 truncate'>{listing.name}</p>
        <div className='flex  items-center gap-1 '>
         <MdLocationOn className='text-green-700 text-xl'/><p className='text-gray-600 text-sm'>{listing.address}</p>
        </div>
        <p className='text-sm text-gray-600 line-clamp-2'>{listing.description}</p>
        <p className='text-slate-500 mt-1 font-semibold'>$
        {
            listing.offer?listing.discountedPrice:listing.regularPrice
        }
        {
            listing.type==='rent'&&'/Month'
        }
        </p>
        <div className='flex gap-2'>
          <div className='text-xs text-slate-700 font-semibold'>{listing.bedroom>1?`${listing.bedroom} Beds`:`${listing.bedroom} Bed`}</div>
          <div className='text-xs text-slate-700 font-semibold'>{listing.bathroom>1?`${listing.bathroom} Baths`:`${listing.bathroom} Bath`}</div>
        </div>
       </div>
     </Link>
    </div>
  )
}

export default ListingItem
