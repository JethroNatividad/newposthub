import mongoose from 'mongoose'

const PostSchema = new mongoose.Schema({
    text: { type: String, required: true },
    images: [{
        url: { type: String },
        publicId: { type: String }
    }],
    edited: { type: Boolean, default: false },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }]

}, { timestamps: true })

module.exports = mongoose.models.Post || mongoose.model('Post', PostSchema)