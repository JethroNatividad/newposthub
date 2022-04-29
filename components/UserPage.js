import { useState, useEffect } from 'react'
import Skeleton from 'react-loading-skeleton'
import fetcher from '../lib/fetcher'
import Image from 'next/image'

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
    }, [])

    return (
        <div className='p-3'>
            <div className='w-full h-96 max-w-7xl md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50 flex flex-col items-center py-2'>
                <div className='h-20 w-20 sm:h-32 sm:w-32 lg:h-40 lg:w-40 rounded-full overflow-hidden cursor-pointer flex'>
                    { loading ? <Skeleton className='leading-loose' height='160px' width='160px' /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                        <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden">
                            <Image src='https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' layout="fill" />
                        </div>
                    </div> }
                </div>

                <h1>
                    { loading ? <Skeleton width={ 60 } /> : user.username }
                </h1>
            </div>

        </div>
    )
}

export default UserPage