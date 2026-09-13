import Wishlist from "../models/Wishlist.js";

export const getWishlist = async (req, res, next) => {
  try {
    const movies = await Wishlist.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      results: movies,
    });
  } catch (error) {
    next(error);
  }
};

export const addToWishlist = async (req, res, next) => {
  try {
    const { movieId, title, year, poster } = req.body;

    if (!movieId || !title) {
      return res.status(400).json({
        success: false,
        message: "Movie information is required",
      });
    }

    const existingMovie = await Wishlist.findOne({
      movieId,
    });

    if (existingMovie) {
      return res.status(409).json({
        success: false,
        message: "Movie is already in your wishlist",
      });
    }

    const movie = await Wishlist.create({
      movieId,
      title,
      year,
      poster,
    });

    res.status(201).json({
      success: true,
      movie,
    });
  } catch (error) {
    next(error);
  }
};

export const removeFromWishlist = async (req, res, next) => {
  try {
    const movie = await Wishlist.findOneAndDelete({
      movieId: req.params.id,
    });

    if (!movie) {
      return res.status(404).json({
        success: false,
        message: "Movie not found in wishlist",
      });
    }

    res.json({
      success: true,
      message: "Movie removed from wishlist",
    });
  } catch (error) {
    next(error);
  }
};
