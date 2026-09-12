import { useEffect, useState } from "react";
import MovieGrid from "../components/MovieGrid";
import LoadingSkeleton from "../components/LoadingSkeleton";
import useMovieStore from "../store/movieStore";

const Home = () => {
  const [searchInput, setSearchInput] = useState("");

  const { movies, loading, error, search } = useMovieStore();

  useEffect(() => {
    search("batman");
  }, [search]);

  const handleSubmit = (event) => {
    event.preventDefault();

    search(searchInput);
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-white">
      <section className="mx-auto max-w-7xl px-4 py-10">
        <div className="mb-10">
          <h1 className="text-3xl font-bold sm:text-4xl">
            Discover your next movie
          </h1>

          <p className="mt-2 text-zinc-400">
            Search and explore movies you might love.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mb-10 flex gap-3">
          <input
            type="text"
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Search movies..."
            className="flex-1 rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 text-white outline-none focus:border-zinc-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-white px-5 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Search
          </button>
        </form>

        {error && (
          <div className="mb-6 rounded-lg border border-red-900 bg-red-950/40 p-4 text-red-300">
            {error}
          </div>
        )}

        {loading ? <LoadingSkeleton /> : <MovieGrid movies={movies} />}
      </section>
    </main>
  );
};

export default Home;
