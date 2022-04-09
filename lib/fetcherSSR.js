import apiAxios from "./axios"

// ssr so we cant pass withCredentials in axios
async function refreshToken(req, res) {
    // manually get and set the cookie in req
    try {
        const response = await apiAxios.get('/auth/token', {
            headers: {
                cookie: req.headers.cookie
            }
        })
        const cookies = response.headers['set-cookie']
        req.headers.cookie = cookies
        res.setHeader('set-cookie', cookies)
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
        const req = () => apiAxios.get(url, { headers: { cookie: req.headers.cookie } })
        const { data } = await handleRequest(req)
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}