import uploadImages, { deleteImage } from "../../../../lib/cloudinary"
import dbConnect from "../../../../lib/dbConnect"
import User from "../../../../lib/models/User"
import parseForm from "../../../../lib/parseForm"
import verifyToken from "../../../../lib/verifyToken"

export default async function handler(req, res) {
    await dbConnect()

    const { method, query: { uid } } = req
    switch (method) {
        case 'PUT':
            return verifyToken(req, res, () => parseForm(req, res, () => updateProfilePicture(req, res)))
        default:
            res.setHeader('Allow', ['GET'])
            return res.status(405).end(`Method ${method} Not Allowed`)
    }

    async function updateProfilePicture(req, res) {
        const { files: { profilePicture }, user: { id, role } } = req
        console.log(id === uid, id, uid, role)
        if (id !== uid) {
            console.log('here')

            return res.status(401).end('Unauthorized')
        }
        try {
            const currentUser = await User.findOne({ _id: uid })
            if (!currentUser) {
                return res.status(404).end('User not found')
            }
            // upload the profile picture
            const uploadResult = await uploadImages(profilePicture, 'profile_pictures')
            // check if user have a profile picture
            if (currentUser.profilePicture.publicId !== 'default-profile-picture') {
                // delete the old profile picture
                await deleteImage(currentUser.profilePicture.publicId)
            }
            console.log(uploadResult, 'uploadResult')

            const profilePictureData = { url: uploadResult[0].secure_url, publicId: uploadResult[0].public_id, height: uploadResult[0].height, width: uploadResult[0].width }
            // update the user profile picture
            const updatedUser = await User.findOneAndUpdate({ _id: uid }, { profilePicture: profilePictureData })
            console.log(updatedUser, 'updatedUser')
            return res.status(200).json({ error: null, user: updatedUser })
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