import dbConnect from "../../../lib/dbConnect"

export default async function handler(req, res) {
    await dbConnect()

    const { method } = req
    switch (method) {
        case 'POST':
            createPost()
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

}