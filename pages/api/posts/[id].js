export default function handler(req, res) {
    const { id } = req.query
    switch (method) {
        case 'GET':
            getPost()
            break
        case 'PUT':
            updatePost()
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function updatePost() {}
    async function getPost() {}
}