import apiAxios from "./axios"

async function refreshToken() {
    try {
        return await apiAxios.get('/auth/token', { withCredentials: true })
    } catch (error) {
        // throw the error
        throw error
    }
}
// automatically refresh the access token
async function handleRequest(req) {
    try {
        return await req()
    } catch (error) {
        // to try to refresh once
        let sent = false
        while (!sent) {
            if (error?.response?.status === 401) {
                sent = true
                await refreshToken()
                return await req()
            }
            throw error
        }
    }
}

export default async function fetcher(url) {
    try {
        const req = () => apiAxios.get(url, { withCredentials: true })
        const { data } = await handleRequest(req)
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}