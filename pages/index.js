import Head from 'next/head'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import PostList from '../components/PostList'
import fetcher, { deleter } from '../lib/fetcher'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res }) {
  const [error, user] = await fetcherSSR(req, res, '/api/auth/user')
  console.log("ssr USER", user)
  if (!user?.user) {
    return { redirect: { destination: '/login' } }
  }
  return { props: { user: user.user } }

}
export default function Home({ user }) {
  console.log(user, 'user')

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fn = async () => {
      setLoading(true)
      const [err, data] = await fetcher('/api/posts')

      if (err) {
        setLoading(false)
        return toast.error(err.message)
      }
      setLoading(false)
      setPosts(data.posts)
    }
    fn()
  }, [])


  const deletePost = async (id) => {
    const toastId = toast.loading("Deleting...")
    const [err] = await deleter(`/api/posts/${id}`)
    if (err) {
      return toast.update(toastId, { render: err.message, type: "error", isLoading: false, closeOnClick: true, autoClose: 2000 })
    }
    setPosts(posts =>
      posts.filter(post => post._id !== id)
    )
    return toast.update(toastId, { render: "Post deleted", type: "success", isLoading: false, closeOnClick: true, autoClose: 2000 })

  }

  return (
    <div className=' bg-primary-dark min-h-screen'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={ user } />
      <PostList posts={ posts } loading={ loading } deletePost={ deletePost } currentUser={ user } />
    </div>
  )
}
