import { create } from "zustand";
import { searchMovies } from "../services/api";

let searchController = null;

const useMovieStore = create((set, get) => ({
  movies: [],
  loading: false,
  loadingMore: false,
  error: null,

  query: "",
  page: 1,
  totalResults: 0,

  search: async (query, page = 1) => {
    if (!query.trim()) {
      set({
        movies: [],
        query: "",
        error: null,
        loading: false,
      });

      return;
    }

    // Cancel previous request
    if (searchController) {
      searchController.abort();
    }

    searchController = new AbortController();

    set({
      query,
      error: null,
      ...(page === 1 ? { loading: true } : { loadingMore: true }),
    });

    try {
      const data = await searchMovies(query, page, searchController.signal);

      set((state) => ({
        movies: page === 1 ? data.results : [...state.movies, ...data.results],

        page,
        totalResults: data.totalResults,
        loading: false,
        loadingMore: false,
      }));
    } catch (error) {
      // Ignore cancelled requests
      if (error.code === "ERR_CANCELED") {
        return;
      }

      set({
        loading: false,
        loadingMore: false,
        error:
          error.response?.data?.message ||
          "Something went wrong. Please try again.",
      });
    }
  },

  loadMore: async () => {
    const { query, page, loadingMore, totalResults, movies } = get();

    if (loadingMore || movies.length >= totalResults) {
      return;
    }

    await get().search(query, page + 1);
  },

  clearResults: () => {
    set({
      movies: [],
      query: "",
      page: 1,
      totalResults: 0,
      error: null,
    });
  },
}));

export default useMovieStore;
