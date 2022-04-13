import React from 'react'
import Navbar from '../components/Navbar'
import EditPost from '../components/EditPost'
import fetcherSSR from '../lib/fetcherSSR'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'

export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }
    const { pid } = query
    if (!pid) {
        return { redirect: { destination: '/404' } }
    }

    const [error2, data] = await fetcherSSR(req, res, `/posts/${pid}`)
    if (!data?.post) {
        return { redirect: { destination: '/404' } }
    }

    // check if user owns post
    if (data.post.author._id !== user.user.id) {
        return { redirect: { destination: '/' } }
    }

    return { props: { user: user.user, post: data.post } }

}

const newPost = ({ user, post }) => {

    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <EditPost post={ post } />
        </div>
    )
}

export default newPost