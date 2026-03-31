import app from "./app.js"
import config from "./utils/config.js"
import logger from "./utils/logger.js"

app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})


/** 
import express from 'express'
const app = express()
import cors from 'cors'
import mongoose from 'mongoose'

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://fullstack:root@cluster0.qnvfk14.mongodb.net/blogList?appName=Cluster0'
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

const PORT = 3003

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
    */