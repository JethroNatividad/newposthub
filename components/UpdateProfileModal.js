import { Formik } from 'formik'
import nprogress from 'nprogress'
import { useEffect, useRef, useState } from 'react'
import { putter } from '../lib/fetcher'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

const UpdateProfileModal = ({ isOpen, setIsOpen, uid }) => {
    const ref = useRef(null)
    const imgRef = useRef(null)
    const [imgSrc, setImgSrc] = useState('')
    const aspect = 1
    const scale = 1
    const [completedCrop, setCompletedCrop] = useState()
    // make crop square
    const [crop, setCrop] = useState()

    useEffect(() => {
        console.log(completedCrop, 'complete crop')
    }, [completedCrop])


    useEffect(() => {
        /**
         * Alert if clicked on outside of element
         */
        console.log('Confirmation button')
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target) && isOpen) {
                setIsOpen(false)
                console.log("clicked outside")
            }
        }
        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            // Unbind the event listener on clean up
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [ref, isOpen])

    const handleSubmit = async ({ image }, { setValues, setSubmitting }) => {
        console.log("IMAGE", image)
        const formData = new FormData()
        formData.append('profilePicture', image)
        nprogress.start()
        setSubmitting(true)
        const [err, data] = await putter(`/api/user/${uid}/updateProfilePicture`, formData, true)
        if (err) {
            console.log(err.message)
            nprogress.done()
            return toast.error(err.message)
        }
        console.log(data)
        nprogress.done()
        // router.push('/')
        toast.success("Profile picture updated", { delay: 500 })
        setSubmitting(false)
    }

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
        <div ref={ ref } className={ `${isOpen ? 'flex' : 'hidden'} w-full max-w-3xl h-96 fixed top-13 mx-auto left-0 right-0 z-30 bg-tertiary-dark rounded-md flex justify-center items-center` }>
            <Formik initialValues={ { image: null } }
                onSubmit={ handleSubmit }>
                { ({ isSubmitting, handleSubmit, setFieldValue }) => (
                    <form className='flex flex-col items-center space-y-5' onSubmit={ handleSubmit }>
                        <input accept='image/*' type="file" multiple={ false } name="image" onChange={ (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                                setFieldValue('image', e.target.files[0])
                                console.log(e.target.files[0], "Image")
                                const reader = new FileReader()
                                reader.addEventListener('load', () => {
                                    setImgSrc(reader.result.toString() || '')
                                }
                                )
                                reader.readAsDataURL(e.target.files[0])
                            }
                        } } />
                        <div className='absolute top-0 left-0 h-full w-full z-40'>
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
                            <button disabled={ isSubmitting } className='px-4 w-full hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Submit</button>
                        </div>

                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default UpdateProfileModal