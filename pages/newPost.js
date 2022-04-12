import React from 'react'
import Navbar from '../components/Navbar'
import NewPost from '../components/NewPost'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res }) {
    const [error, user] = await fetcherSSR(req, res, '/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }


    return { props: { user: user.user } }

}

const newPost = ({ user }) => {
    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <NewPost />
        </div>
    )
}

export default newPost