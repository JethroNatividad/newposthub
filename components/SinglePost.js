import { DotsHorizontalIcon, UserIcon } from '@heroicons/react/solid'
import { ChatAltIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from "next/link"
import ConfirmationButton from './ConfirmationButton'
import DotsMenu from './DotsMenu'
import CommentSection from './CommentSection'


const SinglePost = ({ data, loading, user }) => {
    const text = data?.text
    const author = data?.author
    const comments = data?.comments
    const updatedAt = data?.updatedAt
    const createdAt = data?.createdAt
    const _id = data?._id
    const commentsCount = comments?.length
    const isAuthor = author?._id === user.id
    const timePassed = moment(createdAt).fromNow()
    const isEdited = updatedAt !== createdAt

    if (loading) return <p>Loading</p>
    return (
        <div className='w-full max-w-3xl mx-3 md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50'>
            {/* Author */ }
            <div className='flex p-2 md:p-4 justify-between'>
                <div className='flex space-x-2'>
                    <div className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer flex justify-center items-center">
                        <UserIcon className="w-7 h-7" />
                    </div>
                    <div>
                        <p className='font-semibold'>{ author.username }</p>
                        <p className='text-sm text-offwhite-100'>{ timePassed } { isEdited && <span className='text-xs text-gray-500'> • edited</span> }</p>
                    </div>
                </div>

                {
                    isAuthor && <DotsMenu>
                        <button className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-orange-400' type="submit"><Link href={ `/post/${_id}/edit` } ><PencilAltIcon className="w-6 h-6 relative" /></Link></button>
                        <ConfirmationButton handleDelete={ handleDelete } />
                    </DotsMenu>
                }
            </div>

            {/* Content */ }
            <div className='p-2 md:p-4'>
                <p>{ text }</p>
            </div>

            {/* Comments button */ }
            <div className='p-2 md:p-4 space-y-3 flex flex-col'>
                <div className='flex justify-end items-center'>
                    { commentsCount > 0 && (<Link href={ `/post/${_id}` } ><p className='text-sm text-offwhite-100 hover:underline cursor-pointer'>{ commentsCount } { commentsCount > 1 ? "Comments" : "Comment" }</p></Link>) }
                </div>

                <div className='w-full  h-[1px] bg-offwhite-50' />

                <div className='flex justify-center items-center'>
                    <CommentSection />
                </div>

            </div>
        </div>
    )
}

export default SinglePost