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

export default api;
