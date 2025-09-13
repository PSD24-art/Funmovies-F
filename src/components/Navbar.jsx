import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-[#141414] text-white px-6 py-3 shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-red-600 font-extrabold uppercase tracking-widest text-2xl"
          >
            FunMovie
          </Link>
          <Link to="/" className="text-gray-300 hover:text-white transition">
            Home
          </Link>
        </div>

        <div>
          {token ? (
            <button
              onClick={logout}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded transition"
            >
              Logout
            </button>
          ) : (
            <Link
              to="/login"
              className="border border-red-600 text-red-600 hover:bg-red-600 hover:text-white px-4 py-1 rounded transition"
            >
              Login / Register
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
