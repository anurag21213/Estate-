import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import { app } from '../firebase'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const UpdateListing = () => {
    const { currUser } = useSelector((state) => state.user)
    const navigate = useNavigate()
    const params = useParams()
    const [files, setFiles] = useState([])
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedroom: 1,
        bathroom: 1,
        regularPrice: 50,
        discountedPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    })
    const [imageUploadError, setImageUploadError] = useState(false)
    const [uploading, setUploding] = useState(false)
    const [formError, setFormError] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchListing = async () => {
            const listingId = params.listingId
            const result = await fetch(`/api/listing/getListing/${listingId}`);
            const data = await result.json()

            if (data.satus === false) {
                console.log(data.message)
                return
            }
            setFormData(data)
        }

        fetchListing()
    }, [])

    const handleUpload = () => {
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            setUploding(true)
            setImageUploadError(false)
            const promises = []

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }

            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) })
                setImageUploadError(false)
                setUploding(false)
            }).catch((err) => {
                setImageUploadError('Image Upload Failed')
                setUploding(false)
            })
        }
        else {
            setImageUploadError('You can upload only 6 images per listing')
            setUploding(false)
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on("state_changed", (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                console.log(progress)
            },
                (error) => {
                    reject(error)
                }
                ,
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => { resolve(downloadUrl) })
                }
            )
        })
    }

    const handleRemoveurl = (index) => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i != index) })
    }

    const handleFormData = (e) => {
        if (e.target.id == 'sale' || e.target.id == 'rent') {
            setFormData({ ...formData, type: e.target.id })
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        }

        if (e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea') {
            setFormData({ ...formData, [e.target.id]: e.target.value })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            if (formData.imageUrls.length < 1) return setFormError('You must choose atleast one image!!')
            if (+formData.regularPrice < +formData.discountedPrice) return setFormError('Discounted price must be lesser than regular price')
            setLoading(true)
            const result = await fetch(`/api/listing/update/${params.listingId}`, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...formData,
                    userRefs: currUser._id
                })
            })

            const data = await result.json()
            setLoading(false)
            if (data.success === false) {
                setFormError(data.message)
                setLoading(false)
            }
            navigate(`/listing/${data._id}`)

        } catch (error) {
            setFormError(error.message)
            setLoading(false)
        }
    }

    //   console.log(formData)
    return (
        <main className='max-w-4xl mx-auto p-3'>
            <h1 className='text-center font-semibold text-3xl my-7'>Update a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4 ' onSubmit={handleSubmit} >
                <div className='flex flex-col gap-4 flex-1'>
                    <input type='text' placeholder='Name' className='p-3 border rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleFormData} value={formData.name} />
                    <textarea type='text' placeholder='Description' className='p-3 border rounded-lg' id='description' required onChange={handleFormData} value={formData.description} />
                    <input type='text' placeholder='Address' className='p-3 border rounded-lg' id='address' required onChange={handleFormData} value={formData.address} />
                    <div className='flex justify-evenly flex-wrap'>
                        <div className='flex gap-2 my-2'>
                            <input type='checkbox' className='w-5' id='sale' onChange={handleFormData} checked={formData.type === 'sale'} />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2 my-2'>
                            <input type='checkbox' className='w-5' id='rent' onChange={handleFormData} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2 my-2'>
                            <input type='checkbox' className='w-5' id='parking' onChange={handleFormData} checked={formData.parking === true} />
                            <span>Parking Spot</span>
                        </div>
                        <div className='flex gap-2 my-2'>
                            <input type='checkbox' className='w-5' id='furnished' onChange={handleFormData} checked={formData.furnished === true} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2 my-2'>
                            <input type='checkbox' className='w-5' id='offer' onChange={handleFormData} checked={formData.offer === true} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex gap-6 flex-wrap'>
                        <div className='flex gap-2 items-center'>
                            <input type='number' id='bedroom' min='1' max='10' required className='border border-gray-300 rounded-lg p-3 focus:outline-none' onChange={handleFormData} value={formData.bedroom} />
                            <p className='font-semibold '>Beds</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type='number' id='bathroom' min='1' max='10' required className='border border-gray-300 rounded-lg p-3 focus:outline-none' onChange={handleFormData} value={formData.bathroom} />
                            <p className='font-semibold '>Bath</p>
                        </div>
                        <div className='flex gap-2 items-center'>
                            <input type='number' id='regularPrice' min='50' max='100000' required className='border border-gray-300 rounded-lg p-3 focus:outline-none' onChange={handleFormData} value={formData.regularPrice} />
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold '>Regular Price</p>
                                <span className='text-xs'>$/Month</span>
                            </div>
                        </div>
                        {formData.offer && <div className='flex gap-2 items-center'>
                            <input type='number' id='discountedPrice' min='0' max='100000' required className='border border-gray-300 rounded-lg p-3 focus:outline-none' onChange={handleFormData} value={formData.discountedPrice} />
                            <div className='flex flex-col items-center'>
                                <p className='font-semibold '>Discounted Price</p>
                                <span className='text-xs'>$/Month</span>
                            </div>
                        </div>}
                    </div>
                </div>
                <div className='flex flex-col flex-1'>
                    <p className='font-semibold '>Images:<span className='text-slate-700 font-normal ml-2'>The first image will be the cover (max:6)</span></p>
                    <div className='flex gap-4'>
                        <input onChange={(e) => { setFiles(e.target.files) }} type='file' id='images' accept='images/*' multiple className='w-full border border-slate-300 rounded p-3' />
                        <button type='button' onClick={handleUpload} disabled={uploading} className='uppercase border border-green-600 text-green-600 rounded hover:shadow disabled:opacity-80 p-3'>{uploading ? 'uploading..' : 'upload'}</button>
                    </div>
                    <p className='text-red-600 text-sm'>{imageUploadError && imageUploadError}</p>
                    {
                        formData.imageUrls.length > 0 && formData.imageUrls.map((urls, index) =>
                            <div className='flex justify-between items-center border gap-3 p-3 my-2 ' key={index}>
                                <img src={urls} alt='listing image' className='w-20 h-20 rounded-lg' />
                                <button type='button' onClick={() => handleRemoveurl(index)} className='text-red-700 uppercase p-3 border hover:opacity-75'>Delete</button>
                            </div>
                        )
                    }
                    <button className='bg-slate-900 text-white uppercase p-3 rounded-lg hover:opacity-95 disabled:opacity-80 my-3' disabled={loading || uploading}>{loading ? 'Updating...' : 'Update Listing'}</button>
                    {formError && <p className='text-red-700 text-xs font-bold'>{formError}</p>}
                </div>
            </form>
        </main>
    )
}


export default UpdateListing