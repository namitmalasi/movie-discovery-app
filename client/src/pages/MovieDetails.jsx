import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  getMovieDetails,
  addToWishlist,
  removeFromWishlist,
  getWishlist,
} from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getMovieDetails(id);
        setMovie(data.movie);

        const wishlistData = await getWishlist();

        const exists = wishlistData.results.some(
          (item) => item.movieId === data.movie.id,
        );

        setIsWishlisted(exists);
      } catch (error) {
        setError(
          error.response?.data?.message || "Unable to load movie details.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  const handleWishlist = async () => {
    try {
      setWishlistLoading(true);

      if (isWishlisted) {
        await removeFromWishlist(movie.id);
        setIsWishlisted(false);
      } else {
        await addToWishlist(movie);
        setIsWishlisted(true);
      }
    } catch (error) {
      console.error("Wishlist error:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <div className="h-10 w-40 animate-pulse rounded bg-zinc-800" />

          <div className="mt-8 grid gap-10 md:grid-cols-[240px_1fr]">
            <div className="aspect-[2/3] animate-pulse rounded-xl bg-zinc-800" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 animate-pulse rounded bg-zinc-800" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-zinc-800" />
              <div className="h-24 animate-pulse rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
        <div className="mx-auto max-w-5xl">
          <Link to="/" className="text-sm text-zinc-400 hover:text-white">
            ← Back to movies
          </Link>

          <div className="mt-10 rounded-xl border border-red-900 bg-red-950/30 p-6">
            <p className="text-red-300">{error}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!movie) {
    return null;
  }
  return (
    <main className="min-h-screen bg-zinc-950 px-4 py-10 text-white">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/"
          className="text-sm text-zinc-500 transition hover:text-white"
        >
          ← Back to movies
        </Link>

        <div className="mt-10">
          {/* Header */}
          <div className="flex flex-col gap-8 sm:flex-row">
            {/* Small Poster */}
            <div className="shrink-0">
              <div className="w-[180px] overflow-hidden rounded-lg bg-zinc-900 shadow-lg">
                {movie.poster ? (
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="block aspect-[2/3] w-full object-cover"
                  />
                ) : (
                  <div className="flex aspect-[2/3] items-center justify-center text-sm text-zinc-500">
                    No poster
                  </div>
                )}
              </div>
            </div>

            {/* Main Movie Info */}
            <div className="max-w-3xl pt-1">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                {movie.title}
              </h1>

              <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-zinc-400">
                <span>{movie.year}</span>
                <span>{movie.runtime}</span>
                <span>{movie.rated}</span>
                <span>{movie.genre}</span>
              </div>

              {movie.rating && (
                <div className="mt-6 inline-flex rounded-md bg-zinc-900 px-3 py-2 text-sm text-zinc-200">
                  ⭐ IMDb {movie.rating}
                </div>
              )}

              <p className="mt-7 max-w-2xl text-[15px] leading-7 text-zinc-400">
                {movie.plot}
              </p>

              <button
                onClick={handleWishlist}
                disabled={wishlistLoading}
                className="mt-7 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black transition hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {wishlistLoading
                  ? "Updating..."
                  : isWishlisted
                    ? "✓ Remove from Wishlist"
                    : "+ Add to Wishlist"}
              </button>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-14 border-t border-zinc-800 pt-10">
            <h2 className="text-xl font-semibold">Movie information</h2>

            <div className="mt-6 grid gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Director
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {movie.director || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Cast
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {movie.actors || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Language
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {movie.language || "N/A"}
                </p>
              </div>

              <div>
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Country
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {movie.country || "N/A"}
                </p>
              </div>

              <div className="sm:col-span-2">
                <p className="text-xs uppercase tracking-wider text-zinc-500">
                  Awards
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-200">
                  {movie.awards || "N/A"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MovieDetails;
