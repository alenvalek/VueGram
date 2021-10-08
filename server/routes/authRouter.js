const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User.js')
const auth = require('../middleware/auth.js')

dotenv.config({ path: '../../config/.env' })


const authRouter = express.Router();


// @route /auth
// @desc Get authenticated user
// @access PROTECTED

authRouter.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.id).select('-password')
        res.json(user)
    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server Error', type: 'fail' })
    }
})


// @route   POST /auth
// @desc    Auth user / get token
// @access  PUBLIC

authRouter.post('/', async (req, res) => {
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email })


        if (!user) return res.status(400).json({ msg: 'Invalid credentials', type: 'fail' })


        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials', type: 'fail' })

        const payload = {
            id: user.id
        }

        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600,
        }, (err, token) => {
            if (err) throw err;
            res.json({
                token, user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    profilePic: user.profilePic
                }
            })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server Error', type: 'fail' })
    }
})


module.exports = authRouter