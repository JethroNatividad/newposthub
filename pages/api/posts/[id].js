import Post from "../../../lib/models/Post"

export default function handler(req, res) {
    const { method, query: { id } } = req

    switch (method) {
        case 'GET':
            getPost(id)
            break
        case 'PUT':
            updatePost()
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getPost() {
        try {
            const post = await Post.findById(id).populate('author', ['username', '_id'])
            if (!post) {
                return res.status(404).end('Post not found')
            }
            return res.status(200).json({ error: null, post })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
    async function updatePost() {}
}