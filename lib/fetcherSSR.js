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
async function handleRequest(req, res, request) {
    try {
        return await request()
    } catch (error) {
        // to try to refresh once
        let sent = false
        while (!sent) {
            if (error?.response?.status === 401) {
                sent = true
                await refreshToken(req, res)
                return await request()
            }
            throw error
        }
    }
}

export default async function fetcherSSR(req, res, url) {
    try {
        const request = () => apiAxios.get(url, { headers: { cookie: req.headers.cookie } })
        const { data } = await handleRequest(req, res, request)
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}