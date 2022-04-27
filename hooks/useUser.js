import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import fetcher from '../lib/fetcher'

const useUser = ({ uid }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fn = async () => {
            const [err, data] = await fetcher(`/api/user/${uid}`)
            if (err) {
                setLoading(false)
                return toast.error(err.message)
            }
            setLoading(false)
            setUser(data.user)
        }
        fn()
    }, [])

    return [user, loading]
}

export default useUser