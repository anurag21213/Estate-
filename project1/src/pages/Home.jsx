import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import ListingItem from '../components/ListingItem'

const Home = () => {
  const [offerListing, setOfferListing] = useState([])
  const [saleListing, setSaleLIsting] = useState([])
  const [rentListing, setRentLIsting] = useState([])
  SwiperCore.use([Navigation])

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const result = await fetch('/api/listing/get?offer=true&limit=4')
        const data = await result.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setOfferListing(data)
        fetchRentListing()
      } catch (error) {
        console.log(error)
      }
    }

    const fetchRentListing = async () => {
      try {
        const result = await fetch('/api/listing/get?type=rent&limit=4')
        const data = await result.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setRentLIsting(data)
        fetchSaleListing()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListing = async () => {
      try {
        const result = await fetch('/api/listing/get?type=sale&limit=4')
        const data = await result.json()
        if (data.success === false) {
          console.log(data.message)
          return
        }
        setSaleLIsting(data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchOfferListings()
  }, [])


  console.log(offerListing)
  console.log(saleListing)
  console.log(rentListing)
  return (
    <div>
      <div className='flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span><br /> place with ease</h1>
        <div className='text-gray-400 text-xs md:text-sm'>
          Anurag Estate is the best place to find your next perfect place to live<br />
          we have a wide range of property to choose from.
        </div>
        <Link to={`/search`} className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>Let;s get started...</Link>
      </div>
      {offerListing && <Swiper navigation>
        {
          offerListing.map((urls, index) => (
            <SwiperSlide key={index}>
              <div className='h-[550px] flex flex-col items-center justify-center' >
                <img src={urls.imageUrls[0]} className='w-full h-full' />

              </div>
            </SwiperSlide>
          ))
        }

      </Swiper>}

      <div className='flex flex-col gap-4 mt-5 p-3 max-w-8xl mx-auto'>
        <div>
        <h1 className='font-bold text-2xl text-slate-800 gap-6 mt-9'>Recent Offers</h1>
        <Link to={`/search?offer=true`} className='font-semibold text-xs md:text-sm hover:underline text-green-700 mb-9'>Show more offers</Link>
        <div className='flex flex-wrap gap-4 md:gap-10 items-center justify-center'>
            {
              offerListing && offerListing.map((listing, index) => (
                <ListingItem key={index} listing={listing} />
              ))
            }
          </div>

        </div>
        <div>
        <h1 className='font-bold text-2xl text-slate-800 gap-6 mt-9'>Recent places for rent</h1>
        <Link to={`/search?type=rent`} className='font-semibold text-xs md:text-sm hover:underline text-green-700 mb-9'>Show more offers</Link>
        <div className='flex  flex-wrap gap-4 md:gap-10 items-center justify-center'>
            {
              rentListing && rentListing.map((listing, index) => (
                <ListingItem key={index} listing={listing} />
              ))
            }
          </div>

        </div>
        <div className='flex flex-col gap-1'>
        <h1 className='font-bold text-2xl text-slate-800 gap-6 mt-9 '>Recent places for Sale</h1>
        <Link to={`/search?type=sale`} className='font-semibold text-xs md:text-sm hover:underline text-green-700 mb-9'>Show more offers</Link>
        <div className='flex flex-wrap gap-4 md:gap-10 items-center justify-center'>
            {
              saleListing && saleListing.map((listing, index) => (
                <ListingItem key={index} listing={listing} />
              ))
            }
          </div>

        </div>

      </div>


    </div>
  )
}

export default Home
