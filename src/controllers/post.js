import Post from '../models/Post.js'
import User from '../models/User.js'
import Comment from '../models/Comment.js'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

export const createPost = async (req, res) => {
  try {
    const { title, text, image } = req.body
    const user = await User.findById(req.userId)
    console.log(image)
    if (image) {
      const newPostWidthImage = new Post({
        username: user.username,
        title,
        text,
        imgUrl: image,
        author: req.userId
      })

      await newPostWidthImage.save()
      await User.findByIdAndUpdate(req.userId, {
        $push: {posts: newPostWidthImage}
      })

      return res.json(newPostWidthImage)
    }

    const newPostWidthoutImg = new Post({
        username: user.username,
        title,
        text,
        imgUrl: '',
        author: req.userId
    })
    
    await newPostWidthoutImg.save()
    await User.findByIdAndUpdate(req.userId, {
      $push: {posts: newPostWidthoutImg}
    })

    return res.json(newPostWidthoutImg)
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find().sort('-createdAt')
    const popularPosts = await Post.find().limit(5).sort('-views')
    if (!allPosts) {
      return res.json({message: 'posts none'})
    }

    res.json({ allPosts, popularPosts })
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const getMyPosts = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
    const posts = await Promise.all(user.posts.map(post => {
      return Post.findById(post._id)
    }))

    res.json({ posts })
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const getById = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate({ _id: req.params.id }, {
      $inc: {views: 1},
    })

    res.json({ post })
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const removePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id)
    if (!post) {
      return res.json({ message: 'post not exist' })
    }

    await User.findByIdAndUpdate(req.userId, {
      $pull: { posts: req.params.id }
    })

    res.json({ message: 'post deleted' })
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const updatePost = async (req, res) => {
  try {
    const { title, text, image, id } = req.body
    const post = await Post.findById(id)

    if (image) {

      post.imgUrl = image
    }

    post.title = title
    post.text = text
    await post.save()

    res.json(post)
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}

export const getPostComments = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    const list = await Promise.all(post.comments.map(comment => {
      return Comment.findById(comment)
    }))

    res.json(list)
    
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}