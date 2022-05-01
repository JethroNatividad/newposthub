import { v2 } from "cloudinary"

export default async function uploadImages(images, folder) {
    console.log(images)
    // check if images is single or array

    images = Array.isArray(images) ? images : [images]

    const promises = images.map(image => {
        return new Promise((resolve, reject) => {
            // get the path of the image
            const path = image.filepath
            console.log(image)
            v2.uploader.upload(path, {
                folder: `newposthub/${folder}`,
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

export function deleteImage(publicId) {
    return new Promise((resolve, reject) => {
        v2.uploader.destroy(publicId, (error, result) => {
            if (error) {
                return reject(error)
            }
            return resolve(result)
        })
    })
}