import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-blue-600 text-xl"
      : "text-gray-700 hover:text-blue-600 transition text-xl";

  return (
    <nav className="bg-white shadow-lg w-full fixed top-0 left-0 z-30">
      <div className=" max-w-full mx-auto px-4 py-6 flex justify-between items-center">
        <p className="text-4xl font-bold text-blue-600">WheelShare</p>

        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <NavLink to="/cars" className={activeClass}>
                Cars
              </NavLink>

              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
              <NavLink to="/about" className={activeClass}>
                About
              </NavLink>
              <NavLink to="/rentals" className={activeClass}>
                My Rentals
              </NavLink>
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline transition text-xl cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink to="/" className={activeClass}>
                Home
              </NavLink>
              <NavLink to="/cars" className={activeClass}>
                Cars
              </NavLink>

              <NavLink
                to="/about"
                className="text-gray-700 hover:text-blue-600 transition text-xl"
              >
                About
              </NavLink>
              <NavLink
                to="/login"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 px-6 py-2 rounded-xl"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200 px-6 py-2 rounded-xl"
              >
                Sign Up
              </NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
