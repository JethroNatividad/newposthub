import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"

export default async function handler(req, res) {
    await dbConnect()

    const { method, body } = req

    switch (method) {
        case 'POST':
            const { usernameOrEmail, password } = body
            if (!usernameOrEmail) {
                return res.status(200).json({ error: { message: "username or email required", field: 'username' } })
            }

            if (!password) {
                return res.status(200).json({ error: { message: "password required", field: 'password' } })
            }
            login(usernameOrEmail, password)
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function login(usernameOrEmail, password) {
        // check if usernameOrEmail is formatted as email
        const isEmail = usernameOrEmail.includes('@')


        const query = isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail }

        try {
            // check if user exists
            const user = await User.findOne(query)
            if (!user) {
                return res.status(200).json({ error: { message: "User not found", field: 'usernameOrEmail', query } })
            }

            // check if password is correct
            const validPass = await user.validPassword(password)
            if (!validPass) {
                return res.status(200).json({ error: { message: "Incorrect password", field: 'password' } })
            }

            return res.status(200).json({ error: null, user })

        } catch (error) {
            console.log(error)
            return res.status(400)
        }


    }
}