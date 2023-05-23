import User from "../models/User.js"
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// register
export const register = async (req, res) => {
  try {
    const { username, password } = req.body

    const userIsExist = await User.findOne({ username })
    if (userIsExist) {
      return res.json({message: 'user is already exist'})
    }

    const salt = await bcrypt.genSalt(10)
    const hashPass = await bcrypt.hash(password, salt)
    
    const user = new User({ username, password: hashPass })

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    await user.save()

    return res.json({user, token, message: 'user created'})
    
  } catch (error) {
    console.log(error)
    return res.json({message: 'registration error'})
  }
}

// login
export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    const user = await User.findOne({ username })
    if (!user) {
      return res.json({message: 'user is not exist'})
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.json({message: 'incorrect password'})
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    return res.json({token, user, message: 'login success'})

  } catch (error) {
    console.log(error)
    return res.json({message: 'login error'})
  }
}

// get me
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId)

    if (!user) {
      return res.json({message: 'user is not exist'})
    }

    const token = await jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    return res.json({token, user, message: 'get me success'})
  } catch (error) {
    console.log(error)
    return res.json({message: 'error'})
  }
}
