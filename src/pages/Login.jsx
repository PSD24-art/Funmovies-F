import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const url = isRegister
      ? "http://localhost:5400/users/register"
      : "http://localhost:5400/users/login";

    const body = isRegister
      ? { email, password, username }
      : { email, password };
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let data;

    try {
      data = await res.json();
    } catch (err) {
      console.error("Failed to parse JSON:", err);
      alert("Server error, please try again.");
      return;
    }

    if (!isRegister && data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else if (isRegister) {
      alert("Registered successfully, now login");
      setIsRegister(false);
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-gradient-to-b from-gray-900 to-black rounded-lg shadow-2xl p-8 text-white">
        <h2 className="text-3xl font-extrabold mb-6" aria-live="polite">
          {isRegister ? "Register" : "Login"}
        </h2>

        <div className="flex flex-col gap-4">
          {isRegister && (
            <input
              placeholder="Username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
            />
          )}

          <input
            placeholder="Email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-[#1f1f1f] border border-gray-700 rounded text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-red-600 transition"
          />

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-red-600 hover:bg-red-700 rounded font-semibold mt-1 transition flex items-center justify-center"
          >
            {isRegister ? "Register" : "Login"}
          </button>
        </div>

        <p
          onClick={() => setIsRegister(!isRegister)}
          style={{ cursor: "pointer" }}
          className="mt-6 text-sm text-gray-400 hover:text-white underline"
        >
          {isRegister
            ? "Already have an account? Login"
            : "No account? Register"}
        </p>
      </div>
    </div>
  );
}
