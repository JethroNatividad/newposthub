import axios from '../lib/axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Link from "next/link"
import Nprogress from 'nprogress'

const Signup = () => {
    const router = useRouter()

    return (
        <div
            className='min-h-screen bg-primary-dark'
        >
            <div className='min-h-screen space-y-10 px-3 flex flex-col lg:flex-row items-center lg:justify-around'>

                <div className='text-offwhite-50 text-center lg:text-left'>
                    <h1 className="text-5xl font-bold font-mono">POSTHUB</h1>
                    <p className='text-lg md:text-xl max-w-md'>Connect with friends and the world around you on Posthub.</p>
                </div>

                <div className='rounded-lg p-2 bg-secondary-dark w-full max-w-md mx-auto md:mx-0'>

                    <Formik initialValues={ { usernameOrEmail: '', password: '' } }
                        onSubmit={ async ({ usernameOrEmail, password }, { setSubmitting }) => {
                            try {
                                Nprogress.start()
                                setSubmitting(true)
                                const res = await axios.post('/auth/login', { usernameOrEmail, password })
                                console.log(res.data)
                                if (res.data.error) {
                                    alert(res.data.error.message)
                                    return setSubmitting(false)
                                }
                                Nprogress.done()
                                router.push('/')
                                setSubmitting(false)
                            } catch (error) {
                                console.log(error)
                            }
                        } }>
                        { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                            <form className='flex flex-col space-y-3' onSubmit={ handleSubmit }>

                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Username or Email' type="text" name="usernameOrEmail" value={ values.usernameOrEmail } onChange={ handleChange } />
                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Password' type="password" name="password" value={ values.password } onChange={ handleChange } />
                                <button className='px-4 hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Log In</button>

                            </form>
                        ) }
                    </Formik>
                    <div className='flex flex-col items-center my-5 space-y-5'>
                        <hr className='border-b-[1px] border-primary-dark w-full' />
                        <p className='text-offwhite-50'>Already have an account? <Link href="#">
                            <a >Log in</a>
                        </Link></p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup