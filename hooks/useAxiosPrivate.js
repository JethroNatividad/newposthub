import React from 'react'
import { useEffect } from 'react'
import axios from '../lib/axios'

const useAxiosPrivate = () => {
    async function useRefreshToken() {
        try {
            return await axios.get('/auth/token', { withCredentials: true })
        } catch (error) {
            // throw the error
            throw error
        }
    }

    useEffect(() => {
        const responseIntercept = axios.interceptors.response.use((res) => res, async (error) => {
            const prevReq = error?.config
            if (error?.response?.status === 401 && !prevReq?.sent) {
                prevReq.sent = true
                await useRefreshToken()
                return axios(prevReq)
            }
            return Promise.reject(error)
        })
        return () => {
            axios.interceptors.response.eject(responseIntercept)
        }
    }, [])

    return axios
}

export default useAxiosPrivate