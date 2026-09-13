import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import useMovieStore from "../store/movieStore";
import useDebounce from "../hooks/useDebounce";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const debouncedSearch = useDebounce(searchInput, 500);

  const {
    movies,
    loading,
    loadingMore,
    error,
    query,
    totalResults,
    search,
    loadMore,
    clearResults,
  } = useMovieStore();

  useEffect(() => {
    if (debouncedSearch.trim()) {
      search(debouncedSearch);
    } else {
      clearResults();
    }
  }, [debouncedSearch, search, clearResults]);

  const handleSubmit = (event) => {
    event.preventDefault();

    search(searchInput);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Discover your next movie
          </h1>

          <p className="mt-2 text-zinc-400">
            Search for movies and discover something interesting.
          </p>
        </div>

        {/* Search */}
        <form onSubmit={handleSubmit} className="mb-8 flex gap-3">
          <input
            type="search"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search movies..."
            className="min-w-0 flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none transition focus:border-zinc-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        </form>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-lg border border-red-900 bg-red-950/40 p-4">
            <p className="text-red-300">{error}</p>

            <button
              onClick={() => search(query)}
              className="mt-3 text-sm font-medium text-white underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Results information */}
        {!loading && movies.length > 0 && (
          <div className="mb-5 flex items-center justify-between">
            <p className="text-sm text-zinc-400">
              {totalResults.toLocaleString()} results
              {query && (
                <>
                  {" "}
                  for <span className="text-white">"{query}"</span>
                </>
              )}
            </p>
          </div>
        )}

        {/* Initial loading */}
        {loading ? (
          <LoadingSkeleton />
        ) : movies.length > 0 ? (
          <>
            <MovieGrid movies={movies} />

            {/* Load more */}
            {movies.length < totalResults && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="rounded-lg border border-zinc-700 px-6 py-3 font-medium transition hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loadingMore ? "Loading..." : "Load more"}
                </button>
              </div>
            )}
          </>
        ) : (
          /* Empty state */
          <div className="py-20 text-center">
            <h2 className="text-xl font-semibold">
              {searchInput ? "No movies found" : "Start exploring"}
            </h2>

            <p className="mt-2 text-zinc-500">
              {searchInput
                ? "Try searching for another movie."
                : "Search for a movie to get started."}
            </p>
          </div>
        )}
      </section>
    </main>
  );
};

export default Home;
