import { CameraIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import nProgress from 'nprogress'
import React, { useEffect, useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'
import { toast } from 'react-toastify'
import { putter } from '../lib/fetcher'
import CropImageModal from './CropImageModal'

const UpdateProfileImage = ({ loading, profilePictureUrl, uid }) => {
    const [cropImageModalOpen, setCropImageModalOpen] = useState(false)
    const inputFileRef = useRef(null)
    const [imageUpload, setImageUpload] = useState(null)

    const handleInputChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageUpload(e.target.files[0])
            setCropImageModalOpen(true)
        }
    }

    const onCancel = () => {
        setCropImageModalOpen(false)
        setImageUpload(null)
        inputFileRef.current.value = ""
    }

    const handleUploadImage = async (crop) => {
        const formData = new FormData()
        // append the image with crop data to the form data
        formData.append('profilePicture', imageUpload)
        // formData.append('crop', JSON.stringify(crop))
        const [err, data] = await putter(`/api/user/${uid}/updateProfilePicture`, formData, true)
        if (err) {
            console.log(err.message)
            nProgress.done()
            return toast.error(err.message)
        }
        console.log(data)
        nProgress.done()
        toast.success("Profile picture updated", { delay: 500 })
        setCropImageModalOpen(false)

    }

    return (
        <div className='h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden flex'>
            <input ref={ inputFileRef } className='hidden' accept='image/*' type="file" multiple={ false } name="image"
                onChange={ handleInputChange } />
            <CropImageModal isOpen={ cropImageModalOpen } onCancel={ onCancel } handleUpload={ handleUploadImage } imageUploadFile={ imageUpload } />
            { loading ? <Skeleton className='leading-loose' height='160px' width='160px' /> : <div onClick={ () => inputFileRef.current.click() } className="group cursor-pointer relative text-offwhite-50 w-full h-full flex items-center justify-center bg-tertiary-dark">
                <div className='opacity-0 group-hover:opacity-100 transition-all ease-in-out absolute top-0 left-0 h-full w-full bg-transparent z-10 flex flex-col justify-center items-center backdrop-blur-lg'><CameraIcon height={ 30 } width={ 30 } /><p className='text-xs sm:text-sm lg:text-lg'>Change photo</p></div>
                <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden group-hover:blur-sm transition-all ease-in-out duration-75">
                    <Image src={ profilePictureUrl } layout="fill" />
                </div>
            </div> }
        </div>
    )
}

export default UpdateProfileImage

