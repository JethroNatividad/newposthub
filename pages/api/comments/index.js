import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"
import Comment from "../../../lib/models/Comment"
import Post from "../../../lib/models/Post"
import verifyToken from "../../../lib/verifyToken"

export default async function handler(req, res) {
    await dbConnect()

    const { method } = req
    switch (method) {
        case 'POST':
            verifyToken(req, res, () => createComment(req, res))
            break
        default:
            res.setHeader('Allow', ['POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function createComment(req, res) {
        const { body: { text }, user: { id } } = req
        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {
            const currentUser = await User.findById(id)
            const newPost = new Post({ text, author: currentUser._id })
            const savedPost = await newPost.save()
            currentUser.posts.push(savedPost._id)
            await currentUser.save()

            return res.status(201).json({ error: null, post: savedPost })
        } catch (error) {
            console.log(error)
            return res.status(403).end(error.message)
        }
    }
}