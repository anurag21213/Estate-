import React from 'react'
import {FaSearch} from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Header = () => {
    const {currUser}=useSelector((state)=>state.user)
    
    return (
        <header className='flex bg-slate-200 shadow-md  items-center justify-center'>
            <div className='flex justify-between w-full sm:w-[80%] items-center p-3' >
                <Link to='/'>
                <h1 className=' flex flex-wrap text-sm sm:text-xl font-bold'>
                    <span className='text-slate-500' >Anurag</span>
                    <span className=' text-slate-700'>Estate</span>
                </h1>
                </Link>
                <form className=' p-2 rounded-lg bg-slate-100 flex items-center justify-center '>
                <input type='text' placeholder='Search...' className='bg-transparent  border-none w-24 sm:w-64  focus:outline-none  ' />
                <FaSearch className='border-slate-600'/>
                </form>
                <ul className=' gap-4 flex sm:w-64 font-bold'>
                <li className='hidden sm:block text-slate-700 hover:underline cursor-pointer'><Link to='/'>Home</Link></li>
                <li className='hidden sm:block text-slate-700 hover:underline cursor-pointer'><Link to='/about'>About</Link></li>
                <Link to='/profile'>{currUser?<img src={currUser.avatar} alt='profile' className='h-7 w-7 rounded-full object-cover '/>:<li className=' text-slate-700 hover:underline cursor-pointer'>Sign up</li>}</Link>
                </ul>
            </div>

        </header>
    )
}

export default Header
