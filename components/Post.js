import React from 'react'
import { DotsHorizontalIcon, UserIcon } from '@heroicons/react/solid'
import { ChatAltIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from "next/link"
import DotsMenu from './DotsMenu'
import ConfirmationButton from './ConfirmationButton'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'
import Images from './Images'
import Image from 'next/image'
import AuthorImage from './AuthorImage'

const Post = ({ data, user, deletePost, loading }) => {
    const router = useRouter()

    const text = data?.text
    const author = data?.author
    const comments = data?.comments
    const createdAt = data?.createdAt
    const _id = data?._id
    const commentsCount = comments?.length
    const isAuthor = author?._id === user?._id
    const timePassed = moment(createdAt).fromNow()
    const isEdited = data?.edited
    const images = data?.images || []
    const profilePicture = author?.profilePicture?.url

    const handleDelete = () => {
        deletePost(_id)
    }


    console.log(data)
    return (
        <div className='w-full bg-secondary-dark rounded-lg text-offwhite-50'>
            {/* Author */ }
            <div className='flex p-2 md:p-4 justify-between'>
                <div className='flex space-x-2'>
                    <AuthorImage loading={ loading } image={ profilePicture || user?.profilePicture?.url } authorId={ author?._id || user?._id } />

                    <div>
                        <p className='font-semibold'>{ loading ? <Skeleton width={ 60 } /> : author?.username || user?.username }</p>
                        <div className='flex items-center space-x-1'>
                            <p className='text-sm text-offwhite-100'>{ loading ? <Skeleton width={ 100 } /> : timePassed }</p>
                            { isEdited && <span className='text-xs text-gray-500'>• edited</span> }
                        </div>
                    </div>
                </div>

                {
                    loading ? <Skeleton width={ 30 } /> : isAuthor && <DotsMenu className="bg-tertiary-dark">
                        <button className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-orange-400' type="button"><Link href={ `/post/${_id}/edit` } passHref ><PencilAltIcon className="w-6 h-6 relative" /></Link></button>
                        <ConfirmationButton handleDelete={ handleDelete } />
                    </DotsMenu>
                }
            </div>

            {/* Content */ }
            <div className='p-2 md:p-4'>
                <p>{ loading ? <Skeleton count={ 3 } /> : text }</p>
            </div>

            { images?.length > 0 && (
                <div className='w-full'>
                    {/* <Images images={images} /> */ }
                    { loading ? <Skeleton count={ 3 } /> : <Images images={ images } /> }

                </div>
            ) }

            {/* Comments button */ }
            <div className='p-2 md:p-4 space-y-3 flex flex-col'>
                <div className='flex justify-end items-center'>
                    { loading ? <Skeleton width={ 70 } /> : commentsCount > 0 && (<Link passHref href={ `/post/${_id}` } ><p className='text-sm text-offwhite-100 hover:underline cursor-pointer'>{ commentsCount } { commentsCount > 1 ? "Comments" : "Comment" }</p></Link>) }
                </div>

                <div className='w-full  h-[1px] bg-offwhite-50' />

                <div className='flex justify-center items-center'>
                    <button disabled={ loading } onClick={ () => router.push(`/post/${_id}`) } className="text-offwhite-100 cursor-pointer flex justify-center space-x-1 hover:bg-tertiary-dark px-3 py-1 rounded-lg w-40">
                        <ChatAltIcon className="w-7 h-7" />
                        <p className='font-semibold'>Comment</p>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default Post