import Head from 'next/head'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import { useRouter } from 'next/router'
// import fetcher from '../lib/fetcher'
import fetcherSSR from '../lib/fetcherSSR'

export async function getServerSideProps({ req, res }) {
  const [error, data] = await fetcherSSR(req, res, '/auth/user')
  if (!data.user) {
    return { redirect: { destination: '/login' } }
  }
  return { props: { user: data.user } }

}
export default function Home({ user }) {
  // const { auth, setUser } = useAuth()
  // const router = useRouter()

  // useEffect(() => {
  //   const fn = async () => {
  //     const [error, data] = await fetcher('/auth/user')
  //     if (!data?.user) {
  //       router.push('/login')
  //     }

  //     if (!error && data) {
  //       setUser(data.user)
  //     }

  //     if (error) {
  //       console.log(error)
  //       if (error.response.status === 403) {
  //         router.push('/login')
  //       }
  //     }
  //   }

  //   fn()
  // }, [])

  return (
    <div className='bg-primary-dark min-h-screen mt-14'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p>Welcome home { user?.username }</p>
    </div>
  )
}
