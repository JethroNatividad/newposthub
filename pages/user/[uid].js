import React from 'react'

export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/api/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }

    return { props: { user: user.user, query } }

}

const Index = ({ user, query }) => {
    return (
        <div>{ query }</div>
    )
}

export default Index