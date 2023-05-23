import express from 'express'
import { checkAuth } from '../middleware/auth.js'
import { createPost, getPosts, getById, getMyPosts, removePost, updatePost, getPostComments } from '../controllers/post.js'

const router = new express.Router()

//create post
router.post('/', checkAuth, createPost)

//get posts
router.get('/', getPosts)

//get post by id
router.get('/:id', getById)

//get my post
router.get('/user/me', checkAuth, getMyPosts)

//delete post
router.delete('/:id', checkAuth, removePost)

//update post
router.put('/:id', checkAuth, updatePost)

//get post gomments
router.get('/comments/:id', getPostComments)

export default router