const mongoose = require('mongoose');







const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
    default: 'user',
    enum: ['user', 'admin']
  },
  avatar: {
    type: String,
  },
  favouriteBlogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog"
    }
  ],
  likedBlogs: [
     {
      type:mongoose.Schema.Types.ObjectId,
      ref:"Blog"
     }
  ],
}, {
  timestamps: true // Automatically manage createdAt and updatedAt fields
});
module.exports = mongoose.model('User', userSchema);