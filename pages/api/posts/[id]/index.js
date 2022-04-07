import Post from "../../../../lib/models/Post"
import verifyToken from "../../../../lib/verifyToken"

export default function handler(req, res) {
    const { method, query: { id } } = req
    // [0] is id, [1] is /comments [2] is /comments/:id

    // check if there is /comments
    // if (params.length === 1) {
    //     const id = params[0]
    switch (method) {
        case 'GET':
            getPost(id)
            break
        case 'PUT':
            verifyToken(req, res, () => updatePost(req, res, id))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    // }
    async function getPost(id) {
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
    async function updatePost(req, res, id) {
        const { body: { text }, user } = req
        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {
            const post = await Post.findById(id)
            if (!post) {
                return res.status(404).end('Post not found')
            }
            if (post.author.toString() !== user.id) {
                return res.status(403).end('You are not authorized to edit this post')
            }
            post.text = text
            await post.save()
            return res.status(200).json({ error: null, post })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
}