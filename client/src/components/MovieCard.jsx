import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group overflow-hidden rounded-xl bg-zinc-900 transition hover:-translate-y-1"
    >
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

      <div className="p-3">
        <h3 className="truncate font-semibold text-white">{movie.title}</h3>

        <p className="mt-1 text-sm text-zinc-400">{movie.year}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
