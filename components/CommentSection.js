import { ChevronRightIcon, UserIcon } from '@heroicons/react/solid'
import { Formik } from 'formik'
import React from 'react'
import Comment from './Comment'

const CommentSection = () => {
    const handleSubmit = async () => {

    }
    return (
        <div className='w-full'>
            <div className='mb-3 space-y-2 max-h-[60vh] overflow-y-scroll'>

                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />

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