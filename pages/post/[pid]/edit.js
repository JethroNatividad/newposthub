import EditPost from "../../../components/EditPost"
import Navbar from "../../../components/Navbar"
import fetcherSSR from "../../../lib/fetcherSSR"


export async function getServerSideProps({ req, res, query }) {
    const [error, user] = await fetcherSSR(req, res, '/api/auth/user')
    if (!user?.user) {
        return { redirect: { destination: '/login' } }
    }
    const { pid } = query
    if (!pid) {
        return { redirect: { destination: '/404' } }
    }

    const [error2, data] = await fetcherSSR(req, res, `/api/posts/${pid}`)
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