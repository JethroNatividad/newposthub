import User from "../../../lib/models/User"
import verifyToken from "../../../lib/verifyToken"

export default async function handler(req, res) {

    const { method } = req
    switch (method) {
        case 'GET':
            return verifyToken(req, res, () => getUser(req, res))
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getUser(req, res) {
        const { user } = req
        try {
            const currentUser = await User.findOne({ _id: user.id })
            // remove the password from the response
            currentUser.hashedPassword = undefined
            if (!currentUser) {
                return res.status(404).end('User not found')
            }
            return res.status(200).json({ error: null, user: currentUser })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }

    }
}