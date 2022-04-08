import axios from 'axios'
import { Formik } from 'formik'
import { useRouter } from 'next/router'
import React from 'react'

const Login = () => {
    const router = useRouter()
    return (
        <div
            className='min-h-screen'
        >
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
                    <form onSubmit={ handleSubmit }>

                        <p>Email</p>
                        <input type="text" name="usernameOrEmail" value={ values.usernameOrEmail } onChange={ handleChange } />
                        <p>Password</p>
                        <input type="password" name="password" value={ values.password } onChange={ handleChange } />
                        <button type="submit">Login</button>
                    </form>
                ) }
            </Formik>
        </div>
    )
}

export default Login