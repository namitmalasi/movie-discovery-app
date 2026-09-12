import { create } from "zustand";
import { searchMovies } from "../services/api";

const useMovieStore = create((set) => ({
  movies: [],
  loading: false,
  error: null,
  query: "",
  page: 1,
  totalResults: 0,

  search: async (query, page = 1) => {
    if (!query.trim()) {
      set({
        movies: [],
        error: null,
        query: "",
      });

      return;
    }

    set({
      loading: true,
      error: null,
      query,
    });

    try {
      const data = await searchMovies(query, page);

      set((state) => ({
        movies: page === 1 ? data.results : [...state.movies, ...data.results],
        page,
        totalResults: data.totalResults,
        loading: false,
      }));
    } catch (error) {
      set({
        loading: false,
        error: error.response?.data?.message || "Failed to fetch movies",
      });
    }
  },
}));

export default useMovieStore;
