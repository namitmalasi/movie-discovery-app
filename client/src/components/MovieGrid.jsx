import MovieCard from "./MovieCard";

const MovieGrid = ({ movies }) => {
  if (!movies.length) {
    return (
      <div className="py-20 text-center text-zinc-400">No movies found.</div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
};

export default MovieGrid;
