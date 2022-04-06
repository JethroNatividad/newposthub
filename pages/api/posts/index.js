import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"
import Post from "../../../lib/models/Post"
import verifyToken from "../../../lib/verifyToken"

export default async function handler(req, res) {
    await dbConnect()

    const { method } = req
    switch (method) {
        case 'GET':
            getPosts(res)
            break
        case 'POST':
            verifyToken(req, res, () => createPost(req, res))
            break
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getPosts(res) {
        try {
            const posts = await Post.find().populate('author', ['username', '_id'])
            res.status(200).json({ error: null, posts })
        } catch (error) {
            console.log(error)
            return res.status(403).end(error.message)
        }
    }
    async function createPost(req) {
        const { body: { text }, user: { id } } = req

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