import Head from 'next/head'
import Navbar from '../components/Navbar'

export default function Home() {
  return (
    <div className='bg-primary-dark min-h-screen'>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

    </div>
  )
}
