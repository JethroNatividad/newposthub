import Head from 'next/head'
import { useEffect } from 'react'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'
import useAxiosPrivate from '../hooks/useAxiosPrivate'
import { useRouter } from 'next/router'

export default function Home() {
  const { auth, setUser } = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const router = useRouter()

  useEffect(() => {
    const fn = async () => {
      const { data } = await axiosPrivate.get('/auth/user')
      const user = data?.user

      if (user) {
        setUser(user)
      } else {
        router.push('/login')
      }
    }

    fn()
  }, [])


  return (
    <div className='bg-primary-dark min-h-screen mt-14'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <p>Welcome home { auth?.user?.username }</p>
      <p>{ auth?.token }</p>
    </div>
  )
}
