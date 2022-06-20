import { ChevronRightIcon, UserIcon } from '@heroicons/react/solid'
import { Formik } from 'formik'
import nprogress from 'nprogress'
import React from 'react'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import fetcher, { deleter, poster } from '../lib/fetcher'
import Comment from './Comment'


const CommentSection = ({ pid, setCommentsCount }) => {
    const [comments, setComments] = useState([])
    const [loadingComments, setLoadingComments] = useState(true)

    const fetchComments = async () => {
        const [err, data] = await fetcher(`/api/posts/${pid}/comments`)
        if (err) {
            toast.error(err.message)
            return []
        }
        return data.comments
    }

    useEffect(() => {
        const fn = async () => {
            const comments = await fetchComments()
            setComments(comments)
            setLoadingComments(false)
        }
        fn()
    }, [])

    const deleteComment = async (id) => {
        const toastId = toast.loading("Deleting...")
        const [err] = await deleter(`/api/posts/${pid}/comments/${id}`)
        if (err) {
            return toast.update(toastId, { render: err.message, type: "error", isLoading: false, closeOnClick: true, autoClose: 2000 })
        }
        setComments(comments => comments.filter(comment => comment._id !== id))
        toast.update(toastId, { render: "Comment deleted", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 })
        setCommentsCount((prev) => prev - 1)
        // sync with server
        const comments = await fetchComments()
        setCommentsCount(comments.length)
        setComments(comments)

    }

    const handleSubmit = async ({ text }, { setValues, setSubmitting }) => {
        setSubmitting(true)
        nprogress.start()
        console.log('CLICK')
        const [err, data] = await poster(`/api/posts/${pid}/comments`, { text: text })
        if (err) {
            setSubmitting(false)
            return toast.error(err.message)
        }
        const sync = await fetchComments()
        setCommentsCount(sync.length)
        setComments(sync)
        setValues({ text: '' })
        nprogress.done()
        setSubmitting(false)
    }
    console.log(comments, "COMMENTS")
    return (
        <div className='w-full'>
            <div className='mb-3 pb-5 space-y-2 max-h-[60vh] overflow-y-scroll'>

                { loadingComments ? <>
                    <Comment loading={ true } />
                    <Comment loading={ true } />

                </> : comments.map(comment => (<Comment key={ comment._id } deleteComment={ deleteComment } data={ comment } />)) }

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