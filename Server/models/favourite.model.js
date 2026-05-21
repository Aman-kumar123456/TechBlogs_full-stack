import mongoose from "mongoose";

const favouriteBlogSchema = new mongoose.Schema(
  {
    blogId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Blog",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const FavouriteBlog = mongoose.model(
  "FavouriteBlog",
  favouriteBlogSchema
);

export default FavouriteBlog;