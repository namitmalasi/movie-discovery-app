import mongoose from "mongoose";
const wishlistSchema = new mongoose.Schema(
  {
    movieId: {
      type: String,
      required: true,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    year: String,
    poster: String,
  },
  {
    timestamps: true,
  }
);

const Wishlist= mongoose.model("Wishlist", wishlistSchema);