import { useState, useEffect } from 'react'
import fetcher from '../lib/fetcher'

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
        <div>
            <p>UserPage: { uid }</p>
            <p>UserData: { JSON.stringify(user) }</p>
        </div>
    )
}

export default UserPage