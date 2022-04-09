import jwt from "jsonwebtoken"

export default async function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization && req.headers.authorization.split(' ')[1]
    const token = bearerToken || req.cookies.access_token

    if (!token) {
        return res.status(401).end("No Bearer token")
    }
    if (token) {
        try {
            const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
            if (!user) {
                return res.status(401).end("Unauthorized")
            }
            req.user = user
            return next()
        } catch (error) {
            return res.status(401).end(error.message)
        }
    }
}