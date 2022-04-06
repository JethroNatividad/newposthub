import jwt from "jsonwebtoken"
import dbConnect from "../../../lib/dbConnect"
import { generateAccessToken } from "../../../lib/jwt"
import Token from "../../../lib/models/Token"

export default async function handler(req, res) {
    // to refresh token
    // 1. get refresh token from cookie
    // 2. check if refresh token exist in database
    // 3. if refresh token exist, check if refresh token is expired
    // 4. if refresh token is not expired, generate new access token

    await dbConnect()

    const { method, cookies } = req
    switch (method) {
        case 'GET':
            refreshToken(cookies)
            break
        default:
            res.setHeader('Allow', ['GET'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function refreshToken(cookie) {
        const refreshToken = cookie.refresh_token
        if (!refreshToken) {
            console.log('no refresh token')
            return res.status(403)
        }
        try {
            const tokenExists = await Token.findOne({ token: refreshToken })
            if (!tokenExists) {
                console.log('refresh token not found')
                return res.status(403)
            }

            const user = jwt.verify(tokenExists.token, process.env.REFRESH_TOKEN_SECRET)
            const accessToken = generateAccessToken(user)
            return res.status(200).json({ error: null, accessToken })
        } catch (error) {
            console.log(error)
            return res.status(403)
        }
    }
}