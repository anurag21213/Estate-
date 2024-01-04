import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

const Search = () => {
    const [sidebarData, setSideBarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })

    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [showMore,setShowMOre]=useState(false)

    const navigate = useNavigate()

    useEffect(() => {
        const urlparams = new URLSearchParams(location.search)

        const searchTermFromUrl = urlparams.get('searchTerm')
        const typeFromUrl = urlparams.get('type')
        const parkingFromUrl = urlparams.get('parking')
        const furnishedFromUrl = urlparams.get('furnished')
        const offerFromUrl = urlparams.get('offer')
        const sortFromUrl = urlparams.get('sort')
        const orderFromUrl = urlparams.get('order')

        if (
            searchTermFromUrl || typeFromUrl || parkingFromUrl ||
            furnishedFromUrl || offerFromUrl || sortFromUrl ||
            orderFromUrl
        ) {
            setSideBarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc'

            })


        }

        const fetchListings = async () => {
            try {
                setLoading(true)
                const searchquery = urlparams.toString()
                const result = await fetch(`/api/listing/get/?${searchquery}`)
                const data = await result.json()

                if (data.success === false) {
                    console.log(data.message)
                    setLoading(false)
                    return
                }
                if(data.length>8){
                    setShowMOre(true)
                }else{
                    setShowMOre(false)
                }
                setListing(data)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchListings()

    }, [location.search])

    console.log(listing)
    const handleChange = (e) => {
        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSideBarData({ ...sidebarData, type: e.target.id })
        }
        if (e.target.id === 'searchTerm') {
            setSideBarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSideBarData({ ...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false })
        }
        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'

            setSideBarData({ ...sidebarData, sort, order })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('type', sidebarData.type)
        urlParams.set('parking', sidebarData.parking)
        urlParams.set('furnished', sidebarData.furnished)
        urlParams.set('offer', sidebarData.offer)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('order', sidebarData.order)
        const searchQuery = urlParams.toString()

        navigate(`/search/?${searchQuery}`)
    }

    const onShowMoreClick=async()=>{
        const startIndex=listing.length
        const urlParams=new URLSearchParams(location.search)
        urlParams.set('startIndex',startIndex)
        const searchQuery=urlParams.toString()

        const result=await fetch(`/api/listing/get?${searchQuery}`)
        const data=await result.json()
        if(data.length<9){
            setShowMOre(false)
        }

        if(data.success===false){
            console.log(data.message)
            return
        }
        setListing([...listing,...data])
        

    }

    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold' >Search Term</label>
                        <input placeholder='Search....' id='searchTerm' type='text' className='border p-3 rounded-lg  w-full' value={sidebarData.searchTerm} onChange={handleChange} />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='all' onChange={handleChange} checked={sidebarData.type === 'all'} />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='rent' onChange={handleChange} checked={sidebarData.type === 'rent'} />
                            <span>Rent </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='sale' onChange={handleChange} checked={sidebarData.type === 'sale'} />
                            <span>Sale</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='offer' onChange={handleChange} checked={sidebarData.offer} />
                            <span>offer</span>
                        </div>

                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='parking' onChange={handleChange} checked={sidebarData.parking} />
                            <span>Parking</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='furnished' onChange={handleChange} checked={sidebarData.furnished} />
                            <span>Furnished </span>
                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort</label>
                        <select onChange={handleChange} defaultValue={'created_at_desc'} id='sort_order' className='border rounded-lg p-3 focus:outline-none'>
                            <option value='regularPrice_desc'>Price high to low</option>
                            <option value='regularPrice_asc'>Price low to high</option>
                            <option value='createdAt_desc'>Latest</option>
                            <option value='asc'>Oldest</option>

                        </select>

                    </div>
                    <button className='w-full bg-slate-700 text-white uppercase rounded-lg p-3'>Search</button>

                </form>
            </div>
            <div className='flex-1'>
                <h1 className='font-semibold text-3xl text-center border-b-2 p-3 text-slate-700 mt-5'>Listing Results:</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {
                        loading&&(<p className='text-xl text-center'>Loading....</p>)
                    }

                    {
                        !loading&&listing&&listing.map((listing)=>(
                            <ListingItem key={listing._id}  listing={listing}/>
                        ))

                        
                    }
                    
                </div>
                {
                    showMore&&(<button onClick={()=>{onShowMoreClick()}} className='p-7 text-center w-full text-sm text-green-700 hover:underline'>Show More </button>)
                }
            </div>
        </div>
    )
}

export default Search
