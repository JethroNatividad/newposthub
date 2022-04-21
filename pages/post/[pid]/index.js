import Navbar from '../../../components/Navbar'
import SinglePost from '../../../components/SinglePost'
import fetcherSSR from '../../../lib/fetcherSSR'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import fetcher from '../../../lib/fetcher'

export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/api/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }

    return { props: { user: user.user, query } }

}

const Index = ({ user, query }) => {
    // get the query params
    const { pid } = query
    const [post, setPost] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fn = async () => {
            const [err, data] = await fetcher(`/api/posts/${pid}`)
            if (err) {
                setLoading(false)
                return toast.error(err.message)
            }
            console.log(data, "POST DATA SINGLE")
            setLoading(false)
            setPost(data.post)
        }
        fn()
    }, [pid])

    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <SinglePost user={ user } data={ post } loading={ loading } />
        </div>
    )
}




export default Index