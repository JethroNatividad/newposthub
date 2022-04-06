import jwt from "jsonwebtoken"

export default async function verifyToken(req, res, next) {
    const bearerToken = req.headers.authorization && req.headers.authorization.split(' ')[1]
    if (!bearerToken) {
        res.status(401).end("No Bearer token")
    }
    if (bearerToken) {
        try {
            const user = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
            if (!user) {
                res.status(401).end("Unauthorized")
            }
            req.user = user
            next()
        } catch (error) {
            res.status(401).end(error.message)
        }
    }
}