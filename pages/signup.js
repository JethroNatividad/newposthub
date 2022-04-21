import React from 'react'
import fetcherSSR from '../lib/fetcherSSR'
import Signup from '../components/Signup'

export async function getServerSideProps({ req, res }) {
    const [error, data] = await fetcherSSR(req, res, '/api/auth/user')
    if (data?.user) {
        return { redirect: { destination: '/' } }
    }
    return { props: {} }
}

const signup = () => {
    return (
        <Signup />
    )
}

export default signup