import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Contact from '../components/Contact'

const LIsting = () => {
    const {currUser}=useSelector((state)=>state.user)
    SwiperCore.use([Navigation])
    const params = useParams()
    const [listing, setListing] = useState(null)
    const [loading, setloading] = useState(false)
    const [error, setError] = useState(false)
    const [contact,setContact]=useState(false)


    useEffect(() => {
        const fetchListing = async () => {
            setloading(true)
            try {

                const result = await fetch(`/api/listing/getListing/${params.listingId}`);
                const data = await result.json()

                if (data.satus === false) {
                    console.log(data.message)
                    setloading(false)
                    return
                }
                setListing(data)
                setloading(false)
            } catch (error) {
                setError(true)
                setloading(false)
            }
        }

        fetchListing()

    }, [params.listingId])

    console.log(listing)
    return (
        <mian>
            {loading && <p className='text-center text-2xl font-semibold my-4'>Loading....</p>}
            {error && <p className='text-center text-2xl font-semibold my-4'>Something went wrong!!!</p>}
            {listing && !loading && !error && (<div>
                <Swiper navigation>
                    {
                        listing.imageUrls.map((urls) => (
                            <SwiperSlide key={urls}>
                                <div className='h-[550px] flex flex-col items-center justify-center' >
                                    <img src={urls} className='w-full h-full' />
                                </div>
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

                <div className='max-w-6xl mx-auto mt-4 p-2'>
                    <p className='my-2 p-3 font-semibold text-xl' >{listing.name} - {`$ ${listing.regularPrice}`} {listing.type==='rent'?'/Month':''} </p>
                    <p className='flex items-center  text-green-700 w-full '><FaMapMarkerAlt /><span className='text-slate-700 font-mono mx-3 text-clip'> {listing.address}</span></p>
                    <div className='p-2 mt-1 flex gap-4'>
                        <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>
                            {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                        </p>
                        {
                            listing.offer && (<p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-lg'>${+listing.regularPrice - +listing.discountedPrice} Discount</p>)
                        }
                    </div>
                    <p ><span className='font-bold'>Description:</span> {
                        listing.description
                    }</p>
                    <ul className='text-sm text-green-900 font-semibold my-3 flex gap-4 sm:gap-6 items-center flex-wrap'>
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaBed className='text-2xl' />{listing.bedroom > 1 ? `${listing.bedroom} Beds` : `${listing.bedroom} Bed`}
                        </li>
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaBath className='text-2xl' />{listing.bathroom > 1 ? `${listing.bathroom} Baths` : `${listing.bathroom} Bath`}
                        </li>
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaParking className='text-2xl' />{listing.parking > 1 ? 'Parking Spot' : 'No Parking'}
                        </li>
                        <li className='flex items-center gap-2 whitespace-nowrap '>
                            <FaChair className='text-2xl' />{listing.furnished > 1 ? 'Furnished' : 'Non Furnished'}
                        </li>

                    </ul>
                    {
                        currUser&&!contact&&listing.userRefs!=currUser._id&&
                        <button onClick={()=>setContact(true)} className='uppercase text-white bg-slate-800 p-2 rounded-lg w-full hover:opacity-90'>Contact Landlord </button>
                    }
                    {contact&&<Contact listing={listing}/>}
                </div>

            </div>)}


        </mian>
    )
}

export default LIsting
