import { AuthProvider } from '../lib/AuthProvider'
import '../styles/globals.css'
import NProgress from 'nprogress' //nprogress module
import '../styles/nprogress.css' //styles of nprogress
import Router from 'next/router'
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from 'react-toastify'

//Binding events. 
NProgress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => NProgress.start()); Router.events.on('routeChangeComplete', () => NProgress.done()); Router.events.on('routeChangeError', () => NProgress.done())
function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ToastContainer
        position="top-right"
        autoClose={ 5000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss={ false }
        draggable
        pauseOnHover={ false }
        theme="dark"
      />
      <Component { ...pageProps } />
    </AuthProvider>
  )
}

export default MyApp
