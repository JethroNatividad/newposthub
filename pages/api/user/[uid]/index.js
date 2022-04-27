import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../lib/models/User"


export default async function handler(req, res) {
    await dbConnect()

    const { method, query: { uid } } = req

    switch (method) {
        case 'GET':
            return verifyToken(req, res, () => getUser(req, res, uid))
        default:
            res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getUser(uid) {
        try {
            const user = await User.findOne({ _id: uid }).populate('posts')
            // remove the password from the response
            user.hashedPassword = undefined
            if (!user) {
                return res.status(404).end('User not found')
            }
            return res.status(200).json({ error: null, user })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }

}