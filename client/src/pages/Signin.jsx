import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {Link, useNavigate} from 'react-router-dom'
import { signInStart,signInFailure,signInSuccess } from '../redux/user/useSlice'
import OAuth from '../components/OAuth'

const Signin = () => {
  const [formdata,setFormdata]=useState({})
 const {loading,error}=useSelector((state)=>state.user)
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }

  const submithandler=async(e)=>{
    e.preventDefault()
    try {
      dispatch(signInStart())
    const result=await fetch('/api/auth/signin',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata)
    })
   const data=await result.json()
   if(data.success===false){
    dispatch(signInFailure(data.message))
    return
   }
   
   dispatch(signInSuccess(data))
   navigate('/')
  //  console.log(data)
    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className=' p-3 max-w-lg mx-auto' >
      <h2 className=' text-3xl text-center font-semibold my-4'>Sign In</h2>
      <form className='flex flex-col gap-4  ' onSubmit={submithandler}>
        
        <input type='email' placeholder='Email' className=' rounded-lg border p-3 focus:outline-none ' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className=' rounded-lg border p-3 focus:outline-none ' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign In'}</button>
        <OAuth/>
      </form>
      <div className='flex items-center  gap-4'>
      <p>Dont have an account?</p>
      <Link to='/signup' className='text-blue-600'>Sign Up</Link>
      </div>
      {error&&<p className=' text-red-600 my-4'>{error}</p>}
    </div>
  )
}

export default Signin
