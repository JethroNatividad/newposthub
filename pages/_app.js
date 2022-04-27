import Router from 'next/router'
import NProgress from 'nprogress' //nprogress module
import ToastContainer from '../components/ToastContainer'
import '../styles/globals.css'
import '../styles/nprogress.css' //styles of nprogress
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

//Binding events. 
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
  return (
    <>
      <ToastContainer />
      <SkeletonTheme
        baseColor="#b0b3b8"
        highlightColor="#e4e6eb"
        borderRadius="0.5rem"
        duration={ 1 }
      >

        <Component { ...pageProps } />
      </SkeletonTheme>
    </>
  )
}

export default MyApp
