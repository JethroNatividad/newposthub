import React from 'react'
import Navbar from '../components/Navbar'
import EditPost from '../components/EditPost'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }
    const { pid } = query

    if (!pid) {
        return { redirect: { destination: '/404' } }
    }

    const [error2, post] = await fetcherSSR(req, res, `/posts/${pid}`)
    if (!pid || !post?.post) {
        return { redirect: { destination: '/404' } }
    }
    return { props: { user: user.user, post: post } }

}

const newPost = ({ user, post }) => {
    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <EditPost />
        </div>
    )
}

export default newPost