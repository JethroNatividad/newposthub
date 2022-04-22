import dbConnect from "../../../lib/dbConnect"
import User from "../../../lib/models/User"
import Post from "../../../lib/models/Post"
import verifyToken from "../../../lib/verifyToken"
import parseForm from "../../../lib/parseForm"
import uploadImages from "../../../lib/cloudinary"

export default async function handler(req, res) {
    await dbConnect()

    const { method } = req
    switch (method) {
        case 'GET':
            return getPosts(res)
        case 'POST':
            return verifyToken(req, res, () => parseForm(req, res, () => createPost(req, res)))
        default:
            res.setHeader('Allow', ['GET', 'POST'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }
    async function getPosts(res) {
        try {
            const posts = await Post.find().sort({ 'updatedAt': 'desc' }).populate('author', ['username', '_id'])
            return res.status(200).json({ error: null, posts })
        } catch (error) {
            console.log(error)
            return res.status(403).end(error.message)
        }
    }
    async function createPost(req, res) {
        const { body: { text }, files: { images }, user: { id } } = req

        if (!text) {
            return res.status(200).json({ error: { message: "text required", field: 'text' } })
        }

        try {

            const currentUser = await User.findById(id)

            if (images) {
                const imagesResult = await uploadImages(images)
                console.log(imagesResult, "IMGGG")
                console.log(JSON.stringify(imagesResult), "IMGGG")
            }
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

// need to add this to use parseForm
export const config = {
    api: {
        bodyParser: false,
    },
}