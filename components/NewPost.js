import { Formik } from 'formik'
import nprogress from 'nprogress'
import React from 'react'
import Link from "next/link"

const NewPost = () => {
    return (
        <div className='text-offwhite-50 flex flex-col justify-center items-center px-3 lg:px-0 space-y-5'>
            <h1 className='text-xl font-semibold'>Create a post</h1>
            <div className='rounded-lg p-2 bg-secondary-dark w-full max-w-3xl md:mx-0'>

                <Formik initialValues={ { text: '', } }
                    onSubmit={ async ({ text }) => {
                        try {
                            nprogress.start()

                            nprogress.done()
                        } catch (error) {
                            console.log(error)
                        }
                    } }>
                    { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                        <form className='flex flex-col items-center space-y-5' onSubmit={ handleSubmit }>

                            <textarea className=' px-4 py-3 max-h-96 w-full rounded-lg outline-none text-md md:text-md text-offwhite-50 bg-tertiary-dark' placeholder='Type something...' type="text" name="text" value={ values.text } onChange={ handleChange } />
                            <button className='px-4 w-[30%] hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Post</button>

                        </form>
                    ) }
                </Formik>

            </div>
        </div>
    )
}

export default NewPost