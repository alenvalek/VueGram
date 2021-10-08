const express = require('express')
const dotenv = require('dotenv')
const User = require('../models/User.js')
const Post = require('../models/Post.js')
const {cloudinary} = require('../utils/cloudinary')
const auth = require('../middleware/auth.js')

dotenv.config({ path: '../../config/.env' })

const postRouter = express.Router();


// @route /users
// @desc Register new user
// @access PUBLIC

postRouter.post('/', auth, async(req,res) => {
    try {
        const {file, caption} = req.body
        console.log(caption)
        const uploadedResponse = await cloudinary.uploader.upload(file);
        
        const user = await User.findById(req.id).select('-password');
       
        const newPost = new Post({
            user: req.id,
            caption: caption,
            profilePic: user.profilePic,
            username: user.username,
            imageUrl: uploadedResponse.url
        })

        const post = await newPost.save();

        res.json(post);

    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

postRouter.get('/', auth, async(req,res) => {
    try {
        const posts = await Post.find().sort({'date': 'desc'})
        
        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})

postRouter.get('/:id', auth, async(req,res) => {
    
    const {id} = req.params

    try {
        const posts = await Post.find({user: id}).sort({'date': 'desc'})
        res.json(posts);
    } catch (error) {
        console.log(error)
        res.status(500).send('Server Error')
    }
})



// postRouter.get('/myPosts', auth, async(req,res) => {
//     try {
//         const posts = await Post.find({user: req.id})
        
//         res.json(posts);
//     } catch (error) {
//         console.log('I am here')
//         res.status(500).send('Server Error')
//     }
// })

// postRouter.get('/myFollowers', auth, async(req,res) => {
//     try {
//         const user = await User.find({user: req.id})
        
//         res.json(user.followers);
//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Server Error')
//     }
// })

// postRouter.get('/myFollowing', auth, async(req,res) => {
//     try {
//         const user = await User.find({user: req.id})
        
//         res.json(user.following);
//     } catch (error) {
//         console.log(error)
//         res.status(500).send('Server Error')
//     }
// })

module.exports = postRouter