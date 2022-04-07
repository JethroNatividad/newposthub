import User from "../../../../../lib/models/User"
import Comment from "../../../../../lib/models/Comment"
import Post from "../../../../../lib/models/Post"
import verifyToken from "../../../../../lib/verifyToken"
import dbConnect from "../../../../../lib/dbConnect"


export default async function handler(req, res) {
    await dbConnect()

    const { method, query: { cid } } = req

    switch (method) {
        case 'GET':
            getComment(cid)
            break
        case 'PUT':
            verifyToken(req, res, () => updateComment(req, res, cid))
            break
        default:
            res.setHeader('Allow', ['GET', 'PUT'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getComment(cid) {
        try {
            const comment = await Comment.findOne({ _id: cid }).populate('author', ['username', '_id'])
            if (!comment) {
                return res.status(404).end('Comment not found')
            }
            return res.status(200).json({ error: null, comment })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
    async function updateComment(req, res, cid) {
        const { body: { text }, user: { id } } = req
        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {
            const comment = await Comment.findOne({ _id: cid })
            if (!comment) {
                return res.status(404).end('Post not found')
            }
            if (comment.author.toString() !== id) {
                return res.status(403).end('You are not authorized to edit this comment')
            }
            comment.text = text
            await comment.save()
            return res.status(200).json({ error: null, comment })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }
    }
}