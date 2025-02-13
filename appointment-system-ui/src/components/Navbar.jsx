import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthService from "../services/AuthServise";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Get the current route
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu

  // Handle logout
  const handleLogout = () => {
    AuthService.logout(); // Clear token
    navigate("/", { replace: true }); // Redirect to home page
  };

  // Function to check if a link is active
  const isActive = (path) => {
    return location.pathname === path
      ? "text-white font-bold"
      : "text-gray-300 hover:text-white transition-colors";
  };

  return (
    <nav className="bg-[#2A2A2A] p-4 shadow-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo/Brand */}
          <Link to="/" className="text-white text-xl font-bold">
            Appointment App
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link
              to="/available-slots"
              className={`block py-2 px-3 rounded-md ${isActive("/available-slots")}`}
            >
              Available Slots
            </Link>
            <Link
              to="/book"
              className={`block py-2 px-3 rounded-md ${isActive("/book")}`}
            >
              Book Slot
            </Link>
            <Link
              to="/appointments"
              className={`block py-2 px-3 rounded-md ${isActive("/appointments")}`}
            >
              View Appointments
            </Link>
            <button
              onClick={handleLogout}
              className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white"
              aria-label="Toggle Menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden mt-4 space-y-2`}
        >
          <Link
            to="/available-slots"
            className={`block py-2 px-3 rounded-md ${isActive("/available-slots")}`}
            onClick={() => setIsMenuOpen(false)} // Close menu after navigation
          >
            Available Slots
          </Link>
          <Link
            to="/book"
            className={`block py-2 px-3 rounded-md ${isActive("/book")}`}
            onClick={() => setIsMenuOpen(false)} // Close menu after navigation
          >
            Book Slot
          </Link>
          <Link
            to="/appointments"
            className={`block py-2 px-3 rounded-md ${isActive("/appointments")}`}
            onClick={() => setIsMenuOpen(false)} // Close menu after navigation
          >
            View Appointments
          </Link>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;