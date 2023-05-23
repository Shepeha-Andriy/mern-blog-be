import express from 'express'
import * as authController from '../controllers/auth.js'
import { checkAuth } from '../middleware/auth.js'

const router = new express.Router()

//register
router.post('/register', authController.register)

//login
router.post('/login', authController.login)

//get me
router.get('/me', checkAuth, authController.getMe)

export default router