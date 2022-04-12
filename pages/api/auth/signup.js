import { serialize } from "cookie"
import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"
import { generateAccessToken, generateRefreshToken } from "../../../lib/jwt"

export default async function handler(req, res) {
    await dbConnect()

    const { method, body } = req
    switch (method) {
        case 'POST':
            const { username, email, password } = body
            if (!username) {
                return res.status(200).json({ error: { message: "username required", field: 'username' } })
            }
            if (!email) {
                return res.status(200).json({ error: { message: "email required", field: 'email' } })
            }
            if (!password) {
                return res.status(200).json({ error: { message: "password required", field: 'password' } })
            }
            return signup(username, email, password)
        default:
            res.setHeader('Allow', ['POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function signup(username, email, password) {
        // check email if already exists
        const emailExists = await User.findOne({ email })
        const usernameExists = await User.findOne({ username })

        if (emailExists) {
            return res.status(200).json({ error: { message: "Email already exists", field: 'email' } })
        }

        // check username if already exists
        if (usernameExists) {
            return res.status(200).json({ error: { message: "Username already exists", field: 'username' } })
        }

        // create new user
        try {
            const newUser = new User({ username, email, password })
            const savedUser = await newUser.save()

            const accessToken = generateAccessToken(savedUser)
            const refreshToken = await generateRefreshToken(savedUser)

            // add refresh token to cookie http only
            const serializedRefresh = serialize("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
            const serializedAccess = serialize("access_token", accessToken, { httpOnly: true, sameSite: "strict", path: "/" })
            res.setHeader('Set-Cookie', [serializedAccess, serializedRefresh])

            return res.status(200).json({ error: null, accessToken, refreshToken, user: savedUser })
            // return res.status(200).json({ error: null, user: newUser })

        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }

    }
}