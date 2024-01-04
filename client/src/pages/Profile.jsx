import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { Link } from 'react-router-dom'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/useSlice'

const Profile = () => {
  const fileRef = useRef(null)
  const { currUser, loading, error } = useSelector((state) => state.user)
  const [file, setfile] = useState(undefined)
  const [fileperc, setFilePerc] = useState(0)
  const [fileError, fileUploadError] = useState(false)
  const [formData, setFormData] = useState({})
  const [showListingError, setShowLIstingError] = useState(false)
  const [showListing, setShowListing] = useState([])

  const dispatch = useDispatch()

  useEffect(() => {
    if (file) {
      handleUpload(file)
    }
  }, [file])

  const handleUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)


    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      }, (error) => {
        fileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => { setFormData({ ...formData, avatar: downloadUrl }) })
      })

  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const result = await fetch(`/api/user/update/${currUser._id}`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)

      })

      const data = await result.json()

      if (data.success === false) {
        dispatch(updateUserFailure(data.message))
      }

      dispatch(updateUserSuccess(data))


    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const deleteUser = async () => {
    try {
      dispatch(deleteUserStart())
      const result = await fetch(`/api/user/delete/${currUser._id}`, {
        method: 'delete',
      })
      const data = await result.json()
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message))
        return;
      }

      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }

  const logoutHandler = async () => {
    try {
      logoutUserStart()
      const result = await fetch('/api/auth/logout')
      const data = await result.json()
      if (data.success === false) {
        dispatch(logoutUserFailure(data.message))
        return
      }
      dispatch(logoutUserSuccess(data))
    } catch (error) {
      dispatch(logoutUserFailure(error.message))
    }
  }

  const handleShowListings = async () => {
    try {
      setShowLIstingError(false)
      const result = await fetch(`/api/user/listings/${currUser._id}`)
      const data = await result.json()

      if (data.success === false) {
        setShowLIstingError(true)
        return
      }
      setShowListing(data)
      setShowLIstingError(false)

    } catch (error) {
      setShowLIstingError(true)
    }
  }

  const handleDeleteLIsting=async(listingId)=>{
    try {
      const result=await fetch(`/api/listing/delete/${listingId}`,{
        method:'DELETE'
      })
      const data= await result.json()
      if(data.success===false){
        console.log(data.message)
        return
      }
      setShowListing((prev)=>prev.filter((listing)=>listing._id!=listingId))
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-center font-semibold text-3xl my-2  ' >Profile</h2>
      <form className='p-3 flex flex-col  ' onSubmit={handleSubmit}>
        <input onChange={(e) => { setfile(e.target.files[0]) }} type='file' ref={fileRef} hidden accept='image/.*' />
        <img onClick={() => { fileRef.current.click() }} src={formData.avatar || currUser.avatar} alt='Profile image' className='h-24 w-24 rounded-full self-center object-cover cursor-pointer' />
        {fileError ? <span className='text-red-700'>Error in Uploading</span> : fileperc > 0 && fileperc < 100 ? <span className='text-slate-400'>{`Uploading &{fileperc}`}</span> : fileperc == 100 ? <span className='text-green-600'>Successfully Uploaded</span> : ""}
        <input type='text' placeholder='Username' className='p-3 border-none my-4 focus:outline-none ' defaultValue={currUser.username} onChange={handleChange} id='username' />
        <input type='text' placeholder='Email' className='p-3 border-none my-4 focus:outline-none ' defaultValue={currUser.email} onChange={handleChange} id='email' />
        <input type='password' placeholder='Password' className='p-3 border-none my-4  focus:outline-none' onChange={handleChange} id='password' />
        <button disabled={loading} className='p-3 border-none my-2 bg-slate-700 text-white uppercase rounded-lg'>{loading ? 'Loading...' : 'Update'}</button>
        <Link to={'/create-listing'} className='p-3 border-none my-2 bg-green-800 text-white uppercase rounded-lg text-center hover:opacity-95'>
          Create listing
        </Link>
      </form>
      <div className='flex justify-between'>
        <span className='text-red-600 cursor-pointer  font-semibold' onClick={deleteUser}>Delete Account</span>
        <span className='text-red-600 cursor-pointer font-semibold' onClick={logoutHandler}>Signout</span>
      </div>
      <button className='text-green-700 w-full font-bold' onClick={handleShowListings}>Show listing</button>
      <p>{showListingError ? "Error in showing listing" : ''}</p>
      {showListing && showListing.length > 0 &&
        <div className=' flex flex-col gap-3 '>
          <h2 className='text-center mt-7 font-semibold text-2xl w-full '>Your Listings</h2>

          {showListing.map((item, index) =>
            <div key={index} className='flex items-center justify-between border p-3 gap-4'>
              <Link to={`/listing/${currUser._id}`}>
                <img src={item.imageUrls[0]} alt='listing image' className='w-16 h-16 object-contain ' />
              </Link>
              <Link to={`/listing/${currUser._id}`} className='text-slate-700 font-medium flex-1 hover:underline truncate'>
                <p >{item.name}</p>
              </Link>
              <div className='flex flex-col' >
                <button className='p-3 border text-red-600 uppercase' onClick={()=>handleDeleteLIsting(item._id)}>Delete</button>
                <Link to={`/update-listing/${item._id}`}><button className='p-3 border text-green-700 uppercase ' >Edit</button></Link>
              </div>

            </div>

          )}
        </div>
      }
    </div>
  )
}

export default Profile
