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
    const fetchPosts = async (initial = false) => {
        const [err, data] = await fetcher(`/api/posts/${pid}`)
        if (err) {
            initial && setLoading(false)
            return toast.error(err.message)
        }
        initial && setLoading(false)
        setPost(data.post)
        console.log(data, "POST DATA SINGLE")
    }

    useEffect(() => {
        fetchPosts(true)
    }, [])

    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <SinglePost fetchPosts={ fetchPosts } user={ user } data={ post } loading={ loading } />
        </div>
    )
}




export default Index