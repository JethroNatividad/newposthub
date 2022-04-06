import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    images: [String],
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }

}, { timestamps: true })

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)