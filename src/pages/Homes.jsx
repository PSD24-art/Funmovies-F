import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch("https://funmovies-b-1.onrender.com/movies")
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-extrabold mb-6">Movies</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((m) => (
          <Link
            key={m._id}
            to={`/movie/${m._id}`}
            className="group relative block overflow-hidden rounded-lg bg-gray-800 shadow-lg"
          >
            <img
              src={
                m.poster_path ||
                "https://via.placeholder.com/300x450?text=No+Image"
              }
              alt={m.title}
              className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent opacity-75 pointer-events-none" />

            <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
              <div className="max-w-[75%]">
                <h3 className="text-sm font-semibold truncate">{m.title}</h3>
                <p className="text-xs text-gray-300">
                  ⭐ {m.avgRating ?? "N/A"}
                </p>
              </div>

              <div className="ml-2">
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-600 rounded">
                  Play
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
