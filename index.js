import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import fileUpload from 'express-fileupload'

import authRoute from './src/routes/auth.js'
import postRoute from './src/routes/post.js'
import commentRoute from './src/routes/comment.js'

const app = express()
dotenv.config()

//Constants
const PORT = process.env.PORT || 8080
const DB_URL = process.env.DB_URL

//Middleware
app.use(cors())
app.use(fileUpload())
app.use(express.json())
app.use(express.static('uploads'))

//Routes
app.use('/api/auth', authRoute)
app.use('/api/posts', postRoute)
app.use('/api/comment', commentRoute)

async function start() {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useCreateIndex: true
    })
    
    app.listen(PORT, () => {
      console.log(`server started at ${PORT} port`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
