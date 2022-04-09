import { AuthProvider } from '../lib/AuthProvider'
import '../styles/globals.css'
import NProgress from 'nprogress' //nprogress module
import '../styles/nprogress.css' //styles of nprogress
import Router from 'next/router'
//Binding events. 
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component { ...pageProps } />
    </AuthProvider>
  )
}

export default MyApp
