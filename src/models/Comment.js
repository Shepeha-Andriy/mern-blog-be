import mongoose from "mongoose"

const schema = new mongoose.Schema({
  comment: { type: String, required: true },
  author: {type: mongoose.Types.ObjectId, ref: 'User'}
},
{ timestamps: true }
)

export default mongoose.model('Comment', schema);
