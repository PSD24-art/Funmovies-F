import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [reviews, setReviews] = useState([]);
  const [text, setText] = useState("");
  const [rating, setRating] = useState(5);

  useEffect(() => {
    fetch(`http://localhost:5400/movies/${id}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));

    fetch(`http://localhost:5400/reviews/${id}`)
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, [id]);

  const submitReview = async () => {
    const token = localStorage.getItem("token");
    if (!token) return alert("Login first");

    await fetch(`http://localhost:5400/reviews/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({ rating, text }),
    });

    setText("");
    setRating(5);

    // refresh reviews
    const res = await fetch(`http://localhost:5400/reviews/${id}`);
    const data = await res.json();
    setReviews(data);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto bg-gray-800/60 rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row gap-6">
        <img
          src={movie.poster_path}
          alt={movie.title}
          className="w-full md:w-1/3 h-80 md:h-auto object-cover"
        />

        <div className="p-6 flex-1">
          <h1 className="text-3xl font-extrabold text-red-600 mb-2">
            {movie.title}
          </h1>
          <p className="text-sm text-gray-300 mb-4">{movie.synopsis}</p>

          <div className="text-sm text-gray-400 space-y-1 mb-4">
            <p>
              <span className="text-gray-300">Genre:</span>{" "}
              <span className="text-white">{movie.genre}</span>
            </p>
            <p>
              <span className="text-gray-300">Year:</span>{" "}
              <span className="text-white">{movie.year}</span>
            </p>
            <p>
              <span className="text-gray-300">Director:</span>{" "}
              <span className="text-white">{movie.director}</span>
            </p>
            <p className="text-yellow-300 font-semibold">
              Average Rating: ⭐ {movie.avgRating?.toFixed(1)}
            </p>
          </div>

          <h3 className="text-xl font-semibold mt-2 mb-3">Reviews</h3>
          <div className="space-y-3 max-h-48 overflow-auto mb-4 pr-2">
            {reviews.map((r) => (
              <div
                key={r._id}
                className="bg-gray-700/40 p-3 rounded-md border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <p className="font-medium text-white">{r.user.username}</p>
                  <span className="text-yellow-300 font-semibold">
                    ⭐ {r.rating}
                  </span>
                </div>
                <p className="text-sm text-gray-200 mt-1">{r.text}</p>
              </div>
            ))}
            {reviews.length === 0 && (
              <p className="text-gray-400">No reviews yet. Be the first!</p>
            )}
          </div>

          <h3 className="text-lg font-semibold mb-2">Add Review</h3>
          <div className="flex flex-col sm:flex-row gap-2 items-start">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Write your review..."
              className="flex-1 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="number"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              min="1"
              max="5"
              className="w-20 bg-gray-700 border border-gray-600 rounded px-3 py-2 text-center text-sm"
            />
            <button
              onClick={submitReview}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow-sm"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
