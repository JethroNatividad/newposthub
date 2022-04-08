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
        return res.status(200).json({ error: null, user })
    }
}