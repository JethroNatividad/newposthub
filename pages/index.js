import Head from 'next/head'
import Navbar from '../components/Navbar'
import useAuth from '../hooks/useAuth'

export default function Home() {
  const { auth } = useAuth()
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
