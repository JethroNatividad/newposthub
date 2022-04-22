import { v2 } from "cloudinary"

export default async function uploadImages(images) {
    const promises = images.map(image => {
        return new Promise((resolve, reject) => {
            v2.uploader.upload(image, {
                folder: "newposthub",
            }, (error, result) => {
                if (error) {
                    return reject(error)
                }
                return resolve(result)
            })
        })
    })
    const results = await Promise.all(promises)
    return results
}