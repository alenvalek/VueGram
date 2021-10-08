const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const User = require('../models/User.js')

dotenv.config({ path: '../../config/.env' })

const userRouter = express.Router();


// @route /users
// @desc Register new user
// @access PUBLIC

userRouter.get('/:id', async (req,res) => {
    const {id} = req.params

    try {
        let user = await User.findOne({id: id})
        res.json(user)
    } catch (error) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }
})

userRouter.post('/', async (req, res) => {
    const { email, username, password, firstName, lastName } = req.body

    try {
        let user = await User.findOne({ email })

        if (password.length < 6) return res.status(400).json({ msg: 'Password must be at least 6 characters long', type: 'fail' })

        if (user) return res.status(400).json({ msg: 'Email already in use.', type: 'fail' })

        user = new User({
            username,
            email,
            password,
            firstName,
            lastName
        })

        const salt = await bcrypt.genSalt(10)
        user.password = await bcrypt.hash(password, salt)

        await user.save()

        const payload = {
            id: user.id,
            username: user.username,
            email: user.email
        }


        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: 3600
        }, (err, token) => {
            if (err) throw err;
            res.json({ token })
        })

    } catch (err) {
        console.log(err.message)
        res.status(500).json({ msg: 'Server Error' })
    }

})

module.exports = userRouter