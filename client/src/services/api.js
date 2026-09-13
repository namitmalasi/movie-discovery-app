import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 10000,
});

export const searchMovies = async (query, page = 1, signal) => {
  const response = await api.get("/movies/search", {
    params: {
      query,
      page,
    },
    signal,
  });

  return response.data;
};

export const getMovieDetails = async (id) => {
  const response = await api.get(`/movies/${id}`);

  return response.data;
};

export const getWishlist = async () => {
  const response = await api.get("/wishlist");

  return response.data;
};

export const addToWishlist = async (movie) => {
  const response = await api.post("/wishlist", {
    movieId: movie.id,
    title: movie.title,
    year: movie.year,
    poster: movie.poster,
  });

  return response.data;
};

export const removeFromWishlist = async (id) => {
  const response = await api.delete(`/wishlist/${id}`);

  return response.data;
};

export default api;
