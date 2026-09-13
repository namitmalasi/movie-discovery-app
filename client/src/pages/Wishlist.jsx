import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getWishlist, removeFromWishlist } from "../services/api";

const Wishlist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWishlist = async () => {
    try {
      setLoading(true);

      const data = await getWishlist();

      setMovies(data.results);
    } catch (error) {
      console.error("Failed to load wishlist:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemove = async (id) => {
    try {
      await removeFromWishlist(id);

      setMovies((currentMovies) =>
        currentMovies.filter((movie) => movie.movieId !== id),
      );
    } catch (error) {
      console.error("Failed to remove movie:", error);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold">My Wishlist</h1>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="overflow-hidden rounded-xl bg-zinc-900"
              >
                <div className="aspect-[2/3] animate-pulse bg-zinc-800" />

                <div className="p-3">
                  <div className="h-4 animate-pulse rounded bg-zinc-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-7xl">
        <div>
          <h1 className="text-3xl font-bold">My Wishlist</h1>

          <p className="mt-2 text-zinc-500">Movies you've saved for later.</p>
        </div>

        {movies.length === 0 ? (
          <div className="py-24 text-center">
            <h2 className="text-xl font-semibold">Your wishlist is empty</h2>

            <p className="mt-2 text-zinc-500">
              Add movies you want to watch later.
            </p>

            <Link
              to="/"
              className="mt-6 inline-block rounded-lg bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-zinc-200"
            >
              Discover Movies
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {movies.map((movie) => (
              <div
                key={movie.movieId}
                className="group overflow-hidden rounded-xl bg-zinc-900"
              >
                <Link to={`/movie/${movie.movieId}`}>
                  <div className="aspect-[2/3] overflow-hidden bg-zinc-800">
                    {movie.poster ? (
                      <img
                        src={movie.poster}
                        alt={movie.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-zinc-500">
                        No poster
                      </div>
                    )}
                  </div>
                </Link>

                <div className="p-3">
                  <Link to={`/movie/${movie.movieId}`}>
                    <h3 className="truncate font-semibold">{movie.title}</h3>

                    <p className="mt-1 text-sm text-zinc-500">{movie.year}</p>
                  </Link>

                  <button
                    onClick={() => handleRemove(movie.movieId)}
                    className="mt-3 text-sm text-zinc-400 transition hover:text-red-400"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
};

export default Wishlist;
