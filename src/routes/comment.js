import express from 'express'
import * as commentController from '../controllers/comment.js'
import { checkAuth } from '../middleware/auth.js'

const router = new express.Router()

//create comment
router.post('/:id', checkAuth, commentController.create)


export default router