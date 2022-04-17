import { UserIcon } from '@heroicons/react/solid'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import useUser from '../hooks/useUser'
import ConfirmationButton from './ConfirmationButton'
import DotsMenu from './DotsMenu'

const Comment = ({ data, loading, deleteComment }) => {
    // const { text, author, createdAt, updatedAt, _id } = data
    const [user] = useUser()

    const text = data?.text
    const author = data?.author
    const isAuthor = author?._id === user?.id

    const handleDelete = (id) => {
        deleteComment(id)
    }

    return (
        <div className='flex space-x-1'>
            <div className='h-10 w-10 rounded-3xl overflow-hidden'>
                { loading ? <Skeleton circle height={ 40 } width={ 40 } /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                    <UserIcon className="w-6 h-6" />
                </div> }


            </div>

            <div className='bg-tertiary-dark py-1 px-2 rounded-xl w-full max-w-xl flex-1'>
                <div className='flex justify-between'>

                    <p className='font-bold text-sm'>{ loading ? <Skeleton width={ 60 } /> : author?.username }</p>
                    {
                        loading ? <Skeleton width={ 30 } /> : isAuthor && <DotsMenu className="bg-secondary-dark">
                            <ConfirmationButton handleDelete={ () => handleDelete(data._id) } />
                        </DotsMenu>
                    }
                </div>
                <p className='text-md'>{ loading ? <Skeleton count={ 2 } /> : text }</p>
            </div>
        </div>
    )
}

export default Comment