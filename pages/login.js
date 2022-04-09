import React from 'react'
import fetcherSSR from '../lib/fetcherSSR'
import Login from '../components/Login'

export async function getServerSideProps({ req, res }) {
    const [error, data] = await fetcherSSR(req, res, '/auth/user')
    if (data?.user) {
        return { redirect: { destination: '/' } }
    }
    return { props: {} }
}

const login = () => {
    return (
        <Login />
    )
}

export default login