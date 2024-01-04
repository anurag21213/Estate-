import React from 'react'

const Search = () => {
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                <form className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term</label>
                        <input placeholder='Search....' id='searchTerm' type='text' className='border p-3 rounded-lg  w-full' />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Type:</label>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='all' />
                            <span>Rent & Sale</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='rent' />
                            <span>Rent </span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='sale' />
                            <span>Sale</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='offer' />
                            <span>offer</span>
                        </div>

                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label className='font-semibold'>Amenities:</label>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='parking' />
                            <span>Parking</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type='checkbox' className='w-5 h-5' id='furnished' />
                            <span>Furnished </span>
                        </div>

                    </div>
                    <div className='flex items-center gap-2'>
                        <label className='font-semibold'>Sort</label>
                        <select id='sort_order' className='border rounded-lg p-3 focus:outline-none'>
                            <option>Price high to low</option>
                            <option>Price low to high</option>
                            <option>Latest</option>
                            <option>Oldest</option>

                        </select>

                    </div>
                    <button className='w-full bg-slate-700 text-white uppercase rounded-lg p-3'>Search</button>

                </form>
            </div>
            <div className=''>
                <h1 className='font-semibold text-3xl text-center border-b-2 p-3 text-slate-700 mt-5'>Listing Results:</h1>
            </div>
        </div>
    )
}

export default Search
