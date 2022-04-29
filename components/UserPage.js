import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import fetcher from '../lib/fetcher'
import Image from 'next/image'
import PostList from './PostList'

const UserPage = ({ currentUser, uid }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = async () => {
        setLoading(true)
        const [err, user] = await fetcher(`/api/user/${uid}`)
        if (err) {
            return console.error(err)
        }
        setUser(user.user)
        setLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [uid])

    const deletePost = async (id) => {
        const toastId = toast.loading("Deleting...")
        const [err] = await deleter(`/api/posts/${id}`)
        if (err) {
            return toast.update(toastId, { render: err.message, type: "error", isLoading: false, closeOnClick: true, autoClose: 2000 })
        }
        setUser(user => ({ ...user, posts: user.posts.filter(post => post._id !== id) })
        )
        return toast.update(toastId, { render: "Post deleted", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 })

    }

    return (
        <div className='p-3'>
            <div className='w-full max-w-5xl md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50 flex flex-col items-center py-2 mb-6'>
                <div className='h-24 w-24 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden cursor-pointer flex'>
                    { loading ? <Skeleton className='leading-loose' height='160px' width='160px' /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                        <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden">
                            <Image src='https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' layout="fill" />
                        </div>
                    </div> }
                </div>

                <h1 className='font-semibold text-lg sm:text-2xl lg:text-3xl'>
                    { loading ? <Skeleton width={ 60 } /> : user.username }
                </h1>
            </div>
            <PostList posts={ user?.posts } loading={ loading } deletePost={ deletePost } currentUser={ currentUser } />
        </div>
    )
}

export default UserPage