import { UserIcon } from '@heroicons/react/solid'
import React from 'react'

const Comment = ({ data }) => {
    const { text, author, createdAt, updatedAt, _id } = data
    return (
        <div className='flex'>
            <div className="text-offwhite-50 w-10 h-10 mr-1 hover:brightness-150 bg-tertiary-dark rounded-full cursor-pointer flex justify-center items-center">
                <UserIcon className="w-6 h-6" />
            </div>
            <div className='bg-tertiary-dark py-1 px-2 rounded-xl w-full max-w-xl flex-1'>
                <p className='font-bold text-sm'>{ author.username }</p>
                <p className='text-md'>{ text }</p>
            </div>
        </div>
    )
}

export default Comment