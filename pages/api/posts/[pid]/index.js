import dbConnect from "../../../../lib/dbConnect"
import Post from "../../../../lib/models/Post"
import verifyToken from "../../../../lib/verifyToken"

export default async function handler(req, res) {
    // i forgot to add this lol
    await dbConnect()

    const { method, query: { pid } } = req

    switch (method) {
        case 'GET':
            getPost(pid)
            break
        case 'PUT':
            verifyToken(req, res, () => updatePost(req, res, pid))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getPost(pid) {
        try {
            const post = await Post.findOne({ _id: pid }).populate('author', ['username', '_id'])
            if (!post) {
                return res.status(404).end('Post not found')
            }
            return res.status(200).json({ error: null, post })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
    async function updatePost(req, res, pid) {
        const { body: { text }, user: { id } } = req
        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {
            const post = await Post.findOne({ _id: pid })
            if (!post) {
                return res.status(404).end('Post not found')
            }
            if (post.author.toString() !== id) {
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