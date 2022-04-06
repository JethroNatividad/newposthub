import dbConnect from "../../../lib/dbConnect"
import verifyToken from "../../../lib/verifyToken"

export default async function handler(req, res) {
    await dbConnect()

    const { method, body } = req
    switch (method) {
        case 'POST':
            const user = await verifyToken(req, res)
            createPost(user, body)
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}