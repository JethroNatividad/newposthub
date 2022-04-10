import React from 'react'
import { UserIcon } from '@heroicons/react/solid'
import { ChatAltIcon } from '@heroicons/react/outline'

const Post = () => {
    return (
        <div className='w-full bg-secondary-dark rounded-lg text-offwhite-50'>
            {/* Author */ }
            <div className='flex space-x-2 p-2 md:p-4'>
                <div className="text-offwhite-50 hover:brightness-150 bg-tertiary-dark p-2 rounded-3xl cursor-pointer flex justify-center items-center">
                    <UserIcon className="w-7 h-7" />
                </div>
                <div>

                    <p className='font-semibold'>Author</p>
                    <p className='text-sm text-offwhite-100'>1h ago</p>
                </div>
            </div>

            {/* Content */ }
            <div className='p-2 md:p-4'>
                <p>Content</p>
            </div>

            {/* Comments button */ }
            <div className='p-2 md:p-4 space-y-3 flex flex-col'>
                <div className='flex justify-end items-center'>
                    <p className='text-sm text-offwhite-100'>100 Comments</p>
                </div>

                <div className='w-full  h-[1px] bg-offwhite-50' />

                <div className='flex justify-center items-center'>
                    <div className="text-offwhite-100 cursor-pointer flex justify-center space-x-1 hover:bg-tertiary-dark px-3 py-1 rounded-lg w-40">
                        <ChatAltIcon className="w-7 h-7" />
                        <p className='font-semibold'>Comment</p>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Post