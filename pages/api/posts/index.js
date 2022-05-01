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
            const posts = await Post.find().sort({ 'updatedAt': 'desc' }).populate('author', ['username', '_id', 'profilePicture'])
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
            // {
            //     asset_id: 'ac70f1219e8fdf87d18e41978ae75c36',
            //     public_id: 'newposthub/thfm6ba28kpereoexan6',
            //     version: 1650642783,
            //     version_id: '2e2853747374ebb49e73a5651134a97f',
            //     signature: 'a743f4862b71f064437b8985b4c72155c749d913',
            //     width: 1920,
            //     height: 1080,
            //     format: 'png',
            //     resource_type: 'image',
            //     created_at: '2022-04-22T15:53:03Z',
            //     tags: [],
            //     bytes: 2779068,
            //     type: 'upload',
            //     etag: 'dc099db420c93faed78c974c43cbb00f',
            //     placeholder: false,
            //     url: 'http://res.cloudinary.com/jethrosama/image/upload/v1650642783/newposthub/thfm6ba28kpereoexan6.png',
            //     secure_url: 'https://res.cloudinary.com/jethrosama/image/upload/v1650642783/newposthub/thfm6ba28kpereoexan6.png',
            //     folder: 'newposthub',
            //     original_filename: '5c0ae97a947b6611e8cd5b706',
            //     api_key: '916925932114439'
            //   }
            // check if images is an array


            const imagesResult = images ? await uploadImages(images, 'posts') : []
            const imageUrls = imagesResult.map(image => ({ url: image.secure_url, publicId: image.public_id, height: image.height, width: image.width }))
            const newPost = new Post({ text, author: currentUser._id, images: imageUrls })
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