const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'user'
    },
    caption: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    profilePic: {
        type: String,
    },
    likes: [{
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        }
    }],
    comments: [{
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        },
        body: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        },
        date: {
            type: Date,
            default: Date.now
        }
    }],
    date: {
        type: String,
        default: Date.now
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post