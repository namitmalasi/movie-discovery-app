import { searchMovies, getMovieDetails } from "../services/omdbService.js";

const mapMovie = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  type: movie.Type,
  poster: movie.Poster !== "N/A" ? movie.Poster : null,
});

const mapMovieDetails = (movie) => ({
  id: movie.imdbID,
  title: movie.Title,
  year: movie.Year,
  rated: movie.Rated,
  released: movie.Released,
  runtime: movie.Runtime,
  genre: movie.Genre,
  director: movie.Director,
  actors: movie.Actors,
  plot: movie.Plot,
  language: movie.Language,
  country: movie.Country,
  awards: movie.Awards,
  poster: movie.Poster !== "N/A" ? movie.Poster : null,
  rating: movie.imdbRating,
  votes: movie.imdbVotes,
});

export const search = async (req, res, next) => {
  try {
    const { query, page = 1, year } = req.query;

    if (!query?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }

    const data = await searchMovies({
      query: query.trim(),
      page: Number(page),
      year,
    });

    res.json({
      success: true,
      page: Number(page),
      totalResults: Number(data.totalResults),
      results: data.Search.map(mapMovie),
    });
  } catch (error) {
    next(error);
  }
};

export const details = async (req, res, next) => {
  try {
    const movie = await getMovieDetails(req.params.id);

    res.json({
      success: true,
      movie: mapMovieDetails(movie),
    });
  } catch (error) {
    next(error);
  }
};
