import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Posthub</title>
        <meta name="description" content="Posthub" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <p className='text-green-400'>Hello</p>
    </div>
  )
}
