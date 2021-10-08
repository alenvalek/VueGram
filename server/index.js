const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const connectToDB = require('./config/db.js')
const userRouter = require('./routes/userRouter.js')
const authRouter = require('./routes/authRouter.js')
const postRouter = require('./routes/postRouter.js')



dotenv.config({ path: './config/.env' })

const PORT = process.env.PORT


const app = express()


app.use(express.json({ extended: false , limit: '50mb'}))
app.use(express.urlencoded({limit:'50mb', extended: true}))
app.use(cors())

// routes

app.use('/users', userRouter)
app.use('/auth', authRouter)
app.use('/posts', postRouter)


connectToDB()

app.listen(PORT, () => console.log(`Listening for requests @ http://localhost:${PORT}`))