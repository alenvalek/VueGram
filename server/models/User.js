const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    profilePic: {
        type: String,
        default: "https://i.pinimg.com/originals/76/94/84/769484dafbe89bf2b8a22379658956c4.jpg"
    },
    followers: [{
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        },
        username: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        }
    }],
    following: [{
        user: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'user'
        },
        username: {
            type: String,
            required: true
        },
        profilePic: {
            type: String,
            required: true
        }
    }]
})

const User = mongoose.model('user', UserSchema)

module.exports = User