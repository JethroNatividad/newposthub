import { serialize } from "cookie"
import dbConnect from "../../../lib/dbConnect"
import Token from "../../../lib/models/Token"

export default async function handler(req, res) {
    // delete the refresh token from database
    // delete the refresh token from cookies

    await dbConnect()

    const { method, cookies } = req
    switch (method) {
        case 'GET':
            return logout(cookies)
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function logout(cookie) {
        const refreshToken = cookie.refresh_token
        if (!refreshToken) {
            console.log('no refresh token so you are already logged out')
            return res.status(200).end('no refresh token so you are already logged out')
        }
        try {
            const tokenExists = await Token.findOne({ token: refreshToken })
            if (!tokenExists) {
                console.log('refresh token not found so you are already logged out')
                return res.status(403).end('refresh token not found so you are already logged out')
            }
            await tokenExists.remove()
            const serialized = serialize("refresh_token", null, { httpOnly: true, sameSite: "strict", path: "/" })
            res.setHeader('Set-Cookie', serialized)
            console.log("Logged out successfully")
            return res.status(200).end('Logged out successfully')
        } catch (error) {
            console.log(error)
            return res.status(403).end(error.message)
        }
    }
}