import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Homes";
import Movie from "./pages/Movie";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie/:id" element={<Movie />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
