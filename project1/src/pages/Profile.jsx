import React, { useEffect, useRef, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useDispatch, useSelector } from 'react-redux'
import { app } from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess } from '../redux/user/useSlice'

const Profile = () => {
  const fileRef = useRef(null)
  const { currUser,loading,error } = useSelector((state) => state.user)
  const [file, setfile] = useState(undefined)
  const [fileperc, setFilePerc] = useState(0)
  const [fileError, fileUploadError] = useState(false)
  const [formData, setFormData] = useState({})

  const dispatch=useDispatch()

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
      },(error) => {
        fileUploadError(true)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => { setFormData({ ...formData, avatar: downloadUrl } )})
      })
      
  }

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id]:e.target.value})
  }

  const handleSubmit=async(e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const result=await fetch(`/api/user/update/${currUser._id}`,{
        method:'post',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)

      })

      const data= await result.json()

      if(data.success===false){
        dispatch(updateUserFailure(data.message))
      }

      dispatch(updateUserSuccess(data))


    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }

  const deleteUser=async()=>{
       try {
        dispatch(deleteUserStart())
        const result=await fetch(`/api/user/delete/${currUser._id}`,{
          method:'delete',
        })
        const data=await result.json()
        if(data.success===false) {
          dispatch(deleteUserFailure(data.message))
          return;
        }

        dispatch(deleteUserSuccess(data))
       } catch (error) {
        dispatch(deleteUserFailure(error.message))
       }
  }

  const logoutHandler=async()=>{
    try {
      logoutUserStart()
      const result=await fetch('/api/auth/logout')
      const data=await result.json()
      if(data.success===false){
        dispatch(logoutUserFailure(data.message))
        return
      }
      dispatch(logoutUserSuccess(data))
    } catch (error) {
      dispatch(logoutUserFailure(error.message))
    }
  }

  return (
    <div className='max-w-lg mx-auto'>
      <h2 className='text-center font-semibold text-3xl my-2  ' >Profile</h2>
      <form className='p-3 flex flex-col  ' onSubmit={handleSubmit}>
        <input onChange={(e) => { setfile(e.target.files[0]) }} type='file' ref={fileRef} hidden accept='image/.*' />
        <img onClick={() => { fileRef.current.click() }} src={formData.avatar||currUser.avatar} alt='Profile image' className='h-24 w-24 rounded-full self-center object-cover cursor-pointer' />
        {fileError ? <span className='text-red-700'>Error in Uploading</span> : fileperc > 0 && fileperc < 100 ? <span className='text-slate-400'>{`Uploading &{fileperc}`}</span> : fileperc == 100 ? <span className='text-green-600'>Successfully Uploaded</span> : ""}
        <input type='text' placeholder='Username' className='p-3 border-none my-4 focus:outline-none ' defaultValue={currUser.username}  onChange={handleChange}/>
        <input type='text' placeholder='Email' className='p-3 border-none my-4 focus:outline-none ' defaultValue={currUser.email} onChange={handleChange}/>
        <input type='password' placeholder='Password' className='p-3 border-none my-4  focus:outline-none'  onChange={handleChange}/>
        <button disabled={loading}  className='p-3 border-none my-2 bg-slate-700 text-white uppercase rounded-lg'>{loading?'Loading...':'Update'}</button>
        <button  className='p-3 border-none my-2 bg-green-800 text-white uppercase rounded-lg'>Make listing</button>
        </form>
        <div className='flex justify-between'>
        <span className='text-red-600 cursor-pointer  font-semibold' onClick={deleteUser}>Delete Account</span>
        <span className='text-red-600 cursor-pointer font-semibold' onClick={logoutHandler}>Signout</span>
      </div>
    </div>
  )
}

export default Profile
