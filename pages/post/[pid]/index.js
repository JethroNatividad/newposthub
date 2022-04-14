import React from 'react'
import Navbar from '../../../components/Navbar'
import fetcherSSR from '../../../lib/fetcherSSR'

export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }

    return { props: { user: user.user, query } }

}

const index = ({ user, query }) => {
    // get the query params
    const { pid } = query

    return (
        <div className='bg-primary-dark min-h-screen'>
            <Navbar user={ user } />
            <div>
                <p>
                    You are viewing post { pid }
                </p>
            </div>
        </div>
    )
}




export default index