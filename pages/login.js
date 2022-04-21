import React from 'react'
import fetcherSSR from '../lib/fetcherSSR'
import Login from '../components/Login'

export async function getServerSideProps({ req, res }) {
    const [error, data] = await fetcherSSR(req, res, '/api/auth/user')
    console.log("ssr USER", data)
    console.log("ssr Error", error)

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