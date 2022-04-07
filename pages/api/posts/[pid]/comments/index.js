import User from "../../../../../lib/models/User"
import Comment from "../../../../../lib/models/Comment"
import Post from "../../../../../lib/models/Post"
import verifyToken from "../../../../../lib/verifyToken"
import dbConnect from "../../../../../lib/dbConnect"

export default async function handler(req, res) {
    await dbConnect()

    const { method, query: { pid } } = req
    switch (method) {
        case 'GET':
            return getComments(pid)
        case 'POST':
            return verifyToken(req, res, () => createComment(req, res))
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function getComments(pid) {
        try {
            const comments = await Comment.find({ post: pid }).populate('author', ['username', '_id'])
            return res.status(200).json({ error: null, comments })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }

    async function createComment(req, res) {
        const { body: { text }, user: { id } } = req
        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {
            const currentPost = await Post.findById(pid)
            if (!currentPost) {
                return res.status(404).end('Post not found')
            }

            const currentUser = await User.findById(id)

            const newComment = new Comment({ text, author: currentUser._id, post: currentPost._id })
            const savedComment = await newComment.save()

            currentPost.comments.push(savedComment._id)
            await currentPost.save()

            return res.status(201).json({ error: null, comment: savedComment })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
}