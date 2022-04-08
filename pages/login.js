import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

const Login = () => {
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

                <Formik initialValues={ { usernameOrEmail: '', password: '' } }
                    onSubmit={ async ({ usernameOrEmail, password }, { setSubmitting }) => {
                        try {
                            setSubmitting(true)
                            const res = await axios.post('/api/auth/login', { usernameOrEmail, password })
                            console.log(res.data)
                            if (res.data.error) {
                                alert(res.data.error.message)
                                return setSubmitting(false)
                            }
                            router.push('/')
                            setSubmitting(false)
                        } catch (error) {
                            console.log(error)
                        }
                    } }>
                    { ({ values, handleChange, isSubmitting, handleSubmit }) => (
                        <form className='flex rounded-lg flex-col p-2 space-y-3 bg-secondary-dark w-full max-w-md mx-auto md:mx-0' onSubmit={ handleSubmit }>

                            <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Username or Email' type="text" name="usernameOrEmail" value={ values.usernameOrEmail } onChange={ handleChange } />
                            <input className=' px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-tertiary-dark' placeholder='Password' type="password" name="password" value={ values.password } onChange={ handleChange } />
                            <button className='px-4 py-3 rounded-lg outline-none text-md md:text-xl text-offwhite-50 bg-primary-dark' type="submit">Login</button>
                        </form>
                    ) }
                </Formik>
            </div>
        </div>
    )
}

export default Login