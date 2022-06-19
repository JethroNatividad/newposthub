import { CameraIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import React, { useRef, useState } from 'react'
import Skeleton from 'react-loading-skeleton'

const UpdateProfileImage = ({ loading, profilePictureUrl }) => {
    const [cropImageModalOpen, setCropImageModalOpen] = useState(false)
    const inputFileRef = useRef(null)
    const [imageUpload, setImageUpload] = useState(null)
    // const [imgSrc, setImgSrc] = useState('')


    return (
        <div className='h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden flex'>
            <input ref={ inputFileRef } className='hidden' accept='image/*' type="file" multiple={ false } name="image"
                onChange={
                    (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                            setImageUpload(e.target.files[0])
                            console.log(e.target.files[0], "Image")
                            // const reader = new FileReader()
                            // reader.addEventListener('load', () => {
                            //     setImgSrc(reader.result.toString() || '')
                            // }
                            // )
                            // reader.readAsDataURL(e.target.files[0])
                        }
                    }
                } />
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

