import mongoose from "mongoose"

const schema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  password: { type: String, require: true, unique: true },
  posts: [{type: mongoose.Types.ObjectId, ref: 'Post'}]
},
{ timestamps: true }
)

export default mongoose.model('User', schema);
