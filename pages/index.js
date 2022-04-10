import Head from 'next/head'
import Navbar from '../components/Navbar'
import Post from '../components/Post'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res }) {
  const [error, data] = await fetcherSSR(req, res, '/auth/user')
  if (!data?.user) {
    return { redirect: { destination: '/login' } }
  }
  return { props: { user: data.user } }

}
export default function Home({ user }) {

  return (
    <div className='bg-primary-dark min-h-screen'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar user={ user } />

      <div className='max-w-3xl mx-3 md:mx-auto space-y-2'>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />

      </div>
    </div>
  )
}
