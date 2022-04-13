import Head from 'next/head'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res }) {
  const [error, user] = await fetcherSSR(req, res, '/auth/user')
  if (!user?.user) {
    return { redirect: { destination: '/login' } }
  }

  const [error2, posts] = await fetcherSSR(req, res, '/posts')

  return { props: { user: user.user, posts: posts.posts } }

}
export default function Home({ user, posts }) {

  return (
    <div className=' bg-primary-dark min-h-screen'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={ user } />


      <div className='max-w-3xl mx-3 md:mx-auto space-y-2'>

        { posts.map(post => (
          <Post key={ post._id } data={ post } user={ user } />
        )) }

      </div>
    </div>
  )
}
