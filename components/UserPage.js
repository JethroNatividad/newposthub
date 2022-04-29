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
        setUser(user)
        setLoading(false)
    }

    useEffect(() => {
        fetchUser()
    }, [])

    return (
        <div className='p-3'>
            <div className='w-full h-96 max-w-7xl md:mx-auto bg-secondary-dark rounded-lg text-offwhite-50 flex justify-center'>
                <div className='h-16 w-16 rounded-full overflow-hidden cursor-pointer flex'>
                    { loading ? <Skeleton className='leading-loose' height='64px' width='64px' /> : <div className="text-offwhite-50 hover:brightness-150 w-full h-full flex items-center justify-center bg-tertiary-dark">
                        <div className="relative bg-primary-dark h-full w-full rounded-full overflow-hidden">
                            <Image src='https://res.cloudinary.com/jethrosama/image/upload/v1651059504/newposthub/profile_pictures/images_ufarco.png' layout="fill" />
                        </div>
                    </div> }
                </div>
            </div>

        </div>
    )
}

export default UserPage