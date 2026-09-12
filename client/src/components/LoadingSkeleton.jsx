const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({ length: 12 }).map((_, index) => (
        <div key={index} className="overflow-hidden rounded-xl">
          <div className="aspect-[2/3] animate-pulse bg-zinc-800" />

          <div className="space-y-2 bg-zinc-900 p-3">
            <div className="h-4 animate-pulse rounded bg-zinc-800" />
            <div className="h-3 w-1/2 animate-pulse rounded bg-zinc-800" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
