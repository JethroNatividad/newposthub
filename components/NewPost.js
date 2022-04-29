import { Formik } from 'formik'
import nprogress from 'nprogress'
import React from 'react'
import { poster } from '../lib/fetcher'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'


const NewPost = () => {
    const router = useRouter()

    const handleSubmit = async ({ text, images }, { setValues, setSubmitting }) => {
        console.log("IMAGES", images)
        const formData = new FormData()
        formData.append('text', text)
        Array.from(images).forEach(image => formData.append('images', image))

        nprogress.start()
        setSubmitting(true)
        const [err, data] = await poster('/api/posts', formData, true)
        if (err) {
            console.log(err.message)
            nprogress.done()
            return toast.error(err.message)
        }
        console.log(data)
        setValues({ text: '' })
        nprogress.done()
        router.push('/')
        toast.success("Post created successfully", { delay: 500 })
        setSubmitting(false)
    }

    return (
        <div className='text-offwhite-50 flex flex-col justify-center items-center px-3 lg:px-0 space-y-5'>
            <h1 className='text-xl font-semibold'>Create a post</h1>
            <div className='rounded-lg p-2 bg-secondary-dark w-full max-w-3xl md:mx-0'>

                <Formik initialValues={ { text: '', images: {} } }
                    onSubmit={ handleSubmit }>
                    { ({ values, handleChange, isSubmitting, handleSubmit, setFieldValue }) => (
                        <form className='flex flex-col items-center space-y-5' onSubmit={ handleSubmit }>

                            <textarea className=' px-4 py-3 max-h-96 w-full rounded-lg outline-none text-md md:text-md text-offwhite-50 bg-tertiary-dark' placeholder='Type something...' type="text" name="text" value={ values.text } onChange={ handleChange } />
                            <input accept='image/*' type="file" multiple={ true } name="images" onChange={ (e) => {
                                setFieldValue('images', e.target.files)
                                console.log(e.target.files, "Files")
                            } } />
                            <button disabled={ isSubmitting } className='px-4 w-[30%] hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Post</button>

                        </form>
                    ) }
                </Formik>

            </div>
        </div>
    )
}

export default NewPost