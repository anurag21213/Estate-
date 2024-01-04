import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Contact = ({listing}) => {
    const [landlord,setLandlord]=useState(null)
    const [message,setmessage]=useState('')
    
    useEffect(()=>{
       const fetchLandlord=async()=>{
           try {
            const result=await fetch(`/api/user/${listing.userRefs}`)
            const data=await result.json()
            if(data.success===false){
                console.log(data,message)
            }
            setLandlord(data)
           } catch (error) {
            console.log(error)
           }
       }
       fetchLandlord()
    },[listing.userRefs])
    console.log(message)

    const messageHandler=(e)=>{
         setmessage(e.target.value)
    }

  return (
    <div>
      {
        landlord&&(
            <div className='flex flex-col gap-3'>
            <p className='uppercase  p-2 rounded-lg w-full text-center'>Contact <span className='lowercase font-semibold'>{landlord.username} </span> for <span className='lowercase font-semibold'>{listing.name}</span></p>
            <textarea name='message' value={message} id='message' rows='2' onChange={messageHandler} className='p-3 w-full boder border-gray-300 rounded-lg' placeholder='Enter ypur message here...'  />
            <Link to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`} className='p-3 w-full bg-slate-700 text-white rounded-lg text-center'>Send Message</Link>
            </div>
        )
      }
    </div>
  )
}

export default Contact
