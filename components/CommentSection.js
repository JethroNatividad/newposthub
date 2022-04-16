import { ChevronRightIcon, UserIcon } from '@heroicons/react/solid'
import { Formik } from 'formik'
import nprogress from 'nprogress'
import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import fetcher, { poster } from '../lib/fetcher'
import Comment from './Comment'

const fetchComments = async (pid) => {

}
const CommentSection = ({ pid }) => {
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(true)

    useEffect(() => {
        const fn = async () => {
            const [err, data] = await fetcher(`/posts/${pid}/comments`)
            if (err) {
                return toast.error(err.message)
            }
            setComments(data.comments)
            setLoadingComments(false)
        }
        fn()
    }, [])

    const handleSubmit = async ({ text }, { setValues, setSubmitting }) => {
        setSubmitting(true)
        nprogress.start()
        console.log('CLICK')
        const [err, data] = await poster(`/posts/${pid}/comments`, { text: text })
        if (err) {
            setSubmitting(false)
            return toast.error(err.message)
        }
        setValues({ text: '' })
        nprogress.done()
        setComments([...comments, data.comment])
        setSubmitting(false)
    }
    return (
        <div className='w-full'>
            <div className='mb-3 space-y-2 max-h-[60vh] overflow-y-scroll'>

                { loadingComments ? <>
                    <Comment loading={ true } />
                    <Comment loading={ true } />

                </> : comments.map(comment => (<Comment key={ comment._id } data={ comment } />)) }

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