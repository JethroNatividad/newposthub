import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"

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
            signup(username, email, password)
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
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
            await newUser.save()

            return res.status(200).json({ error: null, user: newUser })

        } catch (error) {
            console.log(error)
            return res.status(400)
        }

    }
}