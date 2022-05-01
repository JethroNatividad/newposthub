import { Formik } from 'formik'
import nprogress from 'nprogress'
import { useEffect, useRef } from 'react'
import { putter } from '../lib/fetcher'

const UpdateProfileModal = ({ isOpen, setIsOpen, uid }) => {
    const ref = useRef(null)
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

    return (
        <div ref={ ref } className={ `${isOpen ? 'flex' : 'hidden'} w-full max-w-3xl h-96 fixed top-13 mx-auto left-0 right-0 z-30 bg-tertiary-dark rounded-md flex justify-center items-center` }>
            <Formik initialValues={ { image: null } }
                onSubmit={ handleSubmit }>
                { ({ isSubmitting, handleSubmit, setFieldValue }) => (
                    <form className='flex flex-col items-center space-y-5' onSubmit={ handleSubmit }>

                        <input accept='image/*' type="file" multiple={ false } name="image" onChange={ (e) => {
                            setFieldValue('image', e.target.files[0])
                            console.log(e.target.files[0], "Image")
                        } } />
                        <button disabled={ isSubmitting } className='px-4 w-full hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Submit</button>

                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default UpdateProfileModal