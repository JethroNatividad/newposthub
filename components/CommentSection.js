import { ChevronRightIcon, UserIcon } from '@heroicons/react/solid'
import { Formik } from 'formik'
import React from 'react'

const CommentSection = () => {
    const handleSubmit = async () => {

    }
    return (
        <div className='w-full'>
            <div className='mb-3'>
                <div className='flex'>
                    <div className="text-offwhite-50 w-10 h-10 mr-1 hover:brightness-150 bg-tertiary-dark rounded-full cursor-pointer flex justify-center items-center">
                        <UserIcon className="w-6 h-6" />
                    </div>
                    <div className='bg-tertiary-dark py-1 px-2 rounded-xl w-full max-w-xl flex-1'>
                        <p className='font-bold text-sm'>Username</p>
                        <p className='text-md'>Comment Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, cum. Lorem ipsum dolor sit amet.</p>
                    </div>
                </div>
            </div>
            <Formik initialValues={ { text: '', } }
                onSubmit={ handleSubmit }>
                { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                    <form className='flex items-center' onSubmit={ handleSubmit }>

                        <input className=' px-4 py-3 w-full rounded-lg outline-none text-md md:text-md text-offwhite-50 bg-tertiary-dark' placeholder='Comment' type="text" name="text" value={ values.text } onChange={ handleChange } />
                        <button disabled={ isSubmitting } className='hover:brightness-110 flex items-center py-3 px-3 rounded-lg outline-none font-bold text-offwhite-50 bg-primary-dark' type="submit"><ChevronRightIcon height="24" width="24" /></button>

                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default CommentSection