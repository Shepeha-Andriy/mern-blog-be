import mongoose from "mongoose"

const schema = new mongoose.Schema({
  username: { type: String },
  title: { type: String, require: true },
  text: { type: String, require: true },
  imgUrl: { type: String, default: '' },
  views: { type: Number, default: 0 },
  comments: [{ type: mongoose.Types.ObjectId, ref: 'Comment' }],
  author: {type: mongoose.Types.ObjectId, ref: 'User'}
},
{ timestamps: true }
)

export default mongoose.model('Post', schema);
