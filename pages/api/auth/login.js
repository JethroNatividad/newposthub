import dbConnect from "../../../lib/dbConnect"
import { generateAccessToken, generateRefreshToken } from "../../../lib/jwt"
import User from "../../../lib/models/User"
import { serialize } from "cookie"


export default async function handler(req, res) {
    await dbConnect()

    const { method, body } = req
    console.log(body)

    switch (method) {
        case 'POST':
            const { usernameOrEmail, password } = body
            if (!usernameOrEmail) {
                return res.status(200).json({ error: { message: "Username or email required", field: 'usernameOrEmail' } })
            }

            if (!password) {
                return res.status(200).json({ error: { message: "Password required", field: 'password' } })
            }
            return login(usernameOrEmail, password)
        default:
            res.setHeader('Allow', ['POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function login(usernameOrEmail, password) {
        // check if usernameOrEmail is formatted as email
        const isEmail = usernameOrEmail.includes('@')


        const query = isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail }

        try {
            // check if user exists
            const user = await User.findOne(query)
            if (!user) {
                return res.status(200).json({ error: { message: `Incorrect ${isEmail ? 'email' : 'username'} or password` } })
            }

            // check if password is correct
            const validPass = await user.validPassword(password)
            if (!validPass) {
                return res.status(200).json({ error: { message: `Incorrect ${isEmail ? 'email' : 'username'} or password` } })
            }

            const accessToken = generateAccessToken(user)
            const refreshToken = await generateRefreshToken(user)

            // add refresh token to cookie http only
            const serializedRefresh = serialize("refresh_token", refreshToken, { httpOnly: true, sameSite: "strict", path: "/" })
            const serializedAccess = serialize("access_token", accessToken, { httpOnly: true, sameSite: "strict", path: "/" })
            res.setHeader('Set-Cookie', [serializedAccess, serializedRefresh])

            return res.status(200).json({ error: null, accessToken, refreshToken, user })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
}