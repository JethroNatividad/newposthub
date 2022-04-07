import mongoose from 'mongoose'

const CommentSchema = new mongoose.Schema({
    text: { type: String, required: true },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },

}, { timestamps: true })

module.exports = mongoose.models.Comment || mongoose.model('Comment', CommentSchema)