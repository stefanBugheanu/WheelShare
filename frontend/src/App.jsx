import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { AuthProvider } from "./auth/AuthContext";
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Cars from "./pages/Cars";
import RentPage from "./pages/RentPage";
import LogoutHandler from "./auth/LogoutHandler";
import MyRentals from "./pages/MyRentals";

function App() {
  return (
    <AuthProvider>
      <Router>
        <LogoutHandler />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rent/:id" element={<RentPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/cars" element={<Cars />} />
          <Route path="/rentals" element={<MyRentals />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
