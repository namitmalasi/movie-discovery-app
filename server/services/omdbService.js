import axios from "axios";

const omdbClient = axios.create({
  baseURL: "https://www.omdbapi.com/",
  timeout: 8000,
});

export const searchMovies = async ({ query, page = 1, year }) => {
  const response = await omdbClient.get("/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      s: query,
      type: "movie",
      page,
      y: year || undefined,
    },
  });

  if (response.data.Response === "False") {
    const error = new Error(response.data.Error || "Unable to fetch movies");

    error.status = 404;
    throw error;
  }

  return response.data;
};

export const getMovieDetails = async (imdbId) => {
  const response = await omdbClient.get("/", {
    params: {
      apikey: process.env.OMDB_API_KEY,
      i: imdbId,
      plot: "full",
    },
  });

  if (response.data.Response === "False") {
    const error = new Error(response.data.Error || "Movie not found");

    error.status = 404;
    throw error;
  }

  return response.data;
};
