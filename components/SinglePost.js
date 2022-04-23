import { DotsHorizontalIcon, UserIcon } from '@heroicons/react/solid'
import { ChatAltIcon, PencilAltIcon, TrashIcon } from '@heroicons/react/outline'
import moment from 'moment'
import Link from "next/link"
import ConfirmationButton from './ConfirmationButton'
import DotsMenu from './DotsMenu'
import CommentSection from './CommentSection'
import Skeleton from 'react-loading-skeleton'
import { useRouter } from 'next/router'
import { deleter } from '../lib/fetcher'
import { toast } from 'react-toastify'
import Images from './Images'

const SinglePost = ({ data, loading, user }) => {
    const router = useRouter()

    const text = data?.text
    const author = data?.author
    const comments = data?.comments
    const createdAt = data?.createdAt
    const _id = data?._id
    const commentsCount = comments?.length
    const isAuthor = author?._id === user.id
    const timePassed = moment(createdAt).fromNow()
    const isEdited = data?.edited
    const images = data?.images || []
    const imageUrls = images?.map(image => image.url)

    const testImages = [
        { src: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80' },
        { src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80' },
        { src: 'https://raw.githubusercontent.com/sopetrichor/react-photo-collage/master/preview.png' }]


    const deletePost = async (id) => {
        const toastId = toast.loading("Deleting...")
        const [err] = await deleter(`/api/posts/${id}`)
        if (err) {
            return toast.update(toastId, { render: err.message, type: "error", isLoading: false, closeOnClick: true, autoClose: 2000 })
        }
        router.push('/')
        return toast.update(toastId, { render: "Post deleted", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 })
    }

    const handleDelete = () => deletePost(_id)

    return (
        <div className='p-3'>

            <div className='w-full max-w-3xl md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50'>
                {/* Author */ }
                <div className='flex p-2 md:p-4 justify-between'>
                    <div className='flex space-x-2'>
                        <div className='h-10 w-10 rounded-3xl overflow-hidden'>

                            { loading ? <Skeleton circle height={ 40 } width={ 40 } /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                                <UserIcon className="w-6 h-6" />
                            </div> }
                        </div>
                        <div>
                            <p className='font-semibold'>{ loading ? <Skeleton width={ 60 } /> : author?.username }</p>
                            <div className='flex items-center space-x-1'>
                                <p className='text-sm text-offwhite-100'>{ loading ? <Skeleton width={ 100 } /> : timePassed }</p>
                                { isEdited && <span className='text-xs text-gray-500'>• edited</span> }
                            </div>
                        </div>
                    </div>

                    {
                        loading ? <Skeleton width={ 30 } /> : isAuthor && <DotsMenu className="bg-tertiary-dark">
                            <button className='px-4 flex justify-center hover:brightness-110 py-1 w-full rounded-lg outline-none text-md md:text-xl text-offwhite-100 bg-primary-dark max-w-xs hover:text-orange-400' type="submit"><Link passHref href={ `/post/${_id}/edit` } ><PencilAltIcon className="w-6 h-6 relative" /></Link></button>
                            <ConfirmationButton handleDelete={ handleDelete } />
                        </DotsMenu>
                    }
                </div>

                {/* Content */ }
                <div className='p-2 md:p-4'>
                    <p>{ loading ? <Skeleton count={ 3 } /> : text }</p>

                </div>

                {/* Images */ }
                { imageUrls?.length > 0 && (
                    <div className='w-full'>
                        {/* <Images images={images} /> */ }
                        { loading ? <Skeleton count={ 3 } /> : <Images images={ imageUrls } /> }

                    </div>
                ) }


                {/* Comments button */ }
                <div className='p-2 md:p-4 space-y-3 flex flex-col'>
                    <div className='flex justify-end items-center'>
                        { loading ? <Skeleton width={ 70 } /> : commentsCount > 0 && (<Link href={ `/post/${_id}` } passHref ><p className='text-sm text-offwhite-100 hover:underline cursor-pointer'>{ commentsCount } { commentsCount > 1 ? "Comments" : "Comment" }</p></Link>) }
                    </div>

                    <div className='w-full  h-[1px] bg-offwhite-50' />

                    <div className='flex justify-center items-center'>
                        { !loading && <CommentSection pid={ _id } />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default SinglePost