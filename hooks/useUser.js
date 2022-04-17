import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import fetcher from '../lib/fetcher'

const useUser = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fn = async () => {
            const [err, data] = await fetcher('/auth/user')
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