import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../lib/models/User"
import verifyToken from "../../../../lib/verifyToken"


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
    async function getUser(req, res, uid) {
        try {
            const user = await User.findOne({ _id: uid }).populate({
                path: 'posts',
                populate: {
                    path: 'author',
                    select: ['username', '_id', 'profilePicture']
                }
            })
            // remove the password from the response
            if (!user) {
                return res.status(404).end('User not found')
            }
            user.hashedPassword = undefined

            return res.status(200).json({ error: null, user })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
}