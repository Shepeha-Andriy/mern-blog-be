import Comment from "../models/Comment.js"
import Post from "../models/Post.js"

export const create = async (req, res) => {
  try {
    const { postId, comment } = req.body
    if (!comment) {
      return res.json({message: 'comment not exist'})
    }

    const newComment = new Comment({ comment, author: req.userId})
    await newComment.save()

    try {
      await Post.findByIdAndUpdate(postId, {
        $push: { comments: newComment._id }
      })
    } catch (error) {
      return res.json({message: 'could not add a comment to the post'})
    }

    res.json(newComment)
  } catch (error) {
    res.json({message: 'something went wrong'})
  }
}