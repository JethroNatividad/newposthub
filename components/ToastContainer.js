import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MyToastContainer = () => {

    return <ToastContainer
        position="top-right"
        autoClose={ 2000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss={ false }
        draggable
        pauseOnHover={ false }
        theme="dark"

    />
}

export default MyToastContainer