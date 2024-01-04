import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import OAuth from '../components/OAuth'
const Signout = () => {
  const [formdata,setFormdata]=useState({})
  const [error,setError]=useState(null)
  const [loading,setloading]=useState(false)
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setFormdata({...formdata,[e.target.id]:e.target.value})
  }

  const submithandler=async(e)=>{
    e.preventDefault()
    try {
      setloading(true)
    const result=await fetch('/api/auth/signup',{
      method:'POST',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(formdata)
    })
   const data=await result.json()
   if(data.success===false){
    setError(data.message)
    setloading(false)
    return
   }
   
   setloading(false)
   navigate('/signin')
   console.log(data)
    } catch (error) {
      setloading(false)
      setError(error.message)
    }
  }

  return (
    <div className=' p-3 max-w-lg mx-auto' >
      <h2 className=' text-3xl text-center font-semibold my-4'>SignUp</h2>
      <form className='flex flex-col gap-4  ' onSubmit={submithandler}>
        <input type='text' placeholder='Username' className=' rounded-lg border p-3 focus:outline-none ' id='username' onChange={handleChange}/>
        <input type='email' placeholder='Email' className=' rounded-lg border p-3 focus:outline-none ' id='email' onChange={handleChange}/>
        <input type='password' placeholder='Password' className=' rounded-lg border p-3 focus:outline-none ' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading?'Loading...':'Sign Up'}</button>
        <OAuth/>
      </form>
      <div className='flex items-center  gap-4'>
      <p>Have an account?</p>
      <Link to='/signin' className='text-blue-600'>Sign In</Link>
      </div>
      {error&&<p className=' text-red-600 my-4'>{error}</p>}
    </div>
  )
}

export default Signout
