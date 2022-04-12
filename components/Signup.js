import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'
import Link from "next/link"
import Nprogress from 'nprogress'
import { poster } from '../lib/fetcher'
import { toast } from 'react-toastify'

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

                    <Formik initialValues={ { username: '', email: '', password: '' } }
                        onSubmit={ async ({ username, email, password }, { setSubmitting }) => {
                            Nprogress.start()
                            setSubmitting(true)
                            const [err, data] = await poster('/auth/signup', { username, email, password })
                            console.log(data)
                            if (err) {
                                alert(err.message)
                                Nprogress.done()
                                toast.error(err.message)
                                return setSubmitting(false)
                            }
                            Nprogress.done()
                            router.push('/')
                            toast.success("Welcome back, " + data.user.username, { delay: 1000 })
                            setSubmitting(false)

                        } }>
                        { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                            <form className='flex flex-col space-y-3' onSubmit={ handleSubmit }>

                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Username' type="text" name="username" value={ values.username } onChange={ handleChange } />
                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Email' type="text" name="email" value={ values.email } onChange={ handleChange } />
                                <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Password' type="password" name="password" value={ values.password } onChange={ handleChange } />
                                <button disabled={ isSubmitting } className='px-4 hover:brightness-110 mb-5 py-3 rounded-lg outline-none text-md md:text-xl font-bold text-offwhite-50 bg-primary-dark' type="submit">Sign up</button>

                            </form>
                        ) }
                    </Formik>
                    <div className='flex flex-col items-center my-5 space-y-5'>
                        <hr className='border-b-[1px] border-primary-dark w-full' />
                        <p className='text-offwhite-50'>Already have an account? <Link href="/login">
                            <a >Log in</a>
                        </Link></p>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup