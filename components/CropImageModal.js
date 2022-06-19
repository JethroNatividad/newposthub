import React, { useRef, useState, useEffect } from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const CropImageModal = ({ isOpen, onCancel, imageUploadFile }) => {
    const [imgSrc, setImgSrc] = useState('')
    const imgRef = useRef(null)
    const aspect = 1
    const scale = 1
    const [completedCrop, setCompletedCrop] = useState()
    // make crop square
    const [crop, setCrop] = useState()

    useEffect(() => {
        if (imageUploadFile) {
            const reader = new FileReader()
            reader.readAsDataURL(imageUploadFile)
            reader.addEventListener('load', () => {
                setImgSrc(reader.result.toString() || '')
            })
        }
    }, [imageUploadFile])


    const onImageLoad = (e) => {
        // set the crop to the center of the image and square
        const currentHeight = imgRef.current.height
        const currentWidth = imgRef.current.width
        const hw = currentHeight < currentWidth ? currentHeight : currentWidth
        const x = currentHeight === currentWidth ? 0 : currentHeight < currentWidth ? (currentWidth - currentHeight) / 2 : 0
        const y = currentHeight === currentWidth ? 0 : currentHeight < currentWidth ? 0 : (currentHeight - currentWidth) / 2
        const imageCrop = {
            x,
            y,
            width: hw,
            height: hw,
            unit: 'px'
        }
        console.log(imageCrop, 'image crop')
        setCrop(imageCrop)
    }

    return (
        <div className={ `${isOpen ? 'fixed' : 'hidden'} p-2 top-0 right-0 left-0 mx-auto z-50 w-full max-w-2xl bg-black` }>
            <ReactCrop
                crop={ crop }
                onChange={ (_, percentCrop) => setCrop(percentCrop) }
                onComplete={ (c) => setCompletedCrop(c) }
                aspect={ aspect }
            >
                <img
                    ref={ imgRef }
                    alt="Crop me"
                    src={ imgSrc }
                    style={ { transform: `scale(${scale})` } }
                    onLoad={ onImageLoad }
                />
            </ReactCrop>
            <div className='flex justify-center space-x-4'>
                <button className="px-4 hover:brightness-110 py-2 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-red-800 max-w-xs" onClick={ onCancel }>Cancel</button>
                <button className="px-4 hover:brightness-110 py-2 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-blue-800 max-w-xs" onClick={ onCancel }>Upload</button>
            </div>
        </div>
    )
}

export default CropImageModal