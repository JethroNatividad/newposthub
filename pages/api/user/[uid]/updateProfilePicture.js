import { deleteImage } from "../../../../lib/cloudinary"
import dbConnect from "../../../../lib/dbConnect"
import parseForm from "../../../../lib/parseForm"
import verifyToken from "../../../../lib/verifyToken"

export default async function handler(req, res) {
    await dbConnect()

    const { method } = req
    switch (method) {
        case 'PUT':
            return verifyToken(req, res, () => parseForm(req, res, () => updateProfilePicture(req, res)))
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function updateProfilePicture(req, res) {
        const { files: { profilePicture }, user: { id } } = req
        try {
            const currentUser = await User.findOne({ _id: user.id })
            if (!currentUser) {
                return res.status(404).end('User not found')
            }
            // upload the profile picture
            const uploadResult = await uploadImages(profilePicture)
            // check if user have a profile picture
            if (currentUser.profilePicture.publicId !== 'default-profile-picture') {
                // delete the old profile picture
                await deleteImage(currentUser.profilePicture.publicId)
            }

            const profilePictureData = { url: uploadResult.secure_url, publicId: uploadResult.public_id, height: uploadResult.height, width: uploadResult.width }
            // update the user profile picture
            await User.findOneAndUpdate({ _id: id }, { $set: { profilePicture: profilePictureData } })
            return res.status(200).json({ error: null, user: currentUser })
        } catch (error) {
            console.log(error)
            return res.status(400).end(error.message)
        }

    }

}

export const config = {
    api: {
        bodyParser: false,
    },
}