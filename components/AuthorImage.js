import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Image from 'next/image'
import { useRouter } from 'next/router'

const AuthorImage = ({ loading, image, authorId }) => {
    const router = useRouter()
    const handleProfileClick = () => {
        router.push(`/user/${authorId}`)
    }
    return (
        <div onClick={ handleProfileClick } className='h-10 w-10 rounded-3xl overflow-hidden cursor-pointer'>

            { loading && !image ? <Skeleton circle height={ 40 } width={ 40 } /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden">
                    <Image src={ image } layout="fill" />
                </div>
            </div> }
        </div>
    )
}

export default AuthorImage