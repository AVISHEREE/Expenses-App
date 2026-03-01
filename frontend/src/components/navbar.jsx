import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({ page, onInputChange }) => {
  const location = useLocation();
  const currentPath = location.pathname;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchEnabled, setSearchEnabled] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const auth = localStorage.getItem("userInfo");
    if (auth && currentPath === "/") {
      setSearchEnabled(true);
    }
  }, [currentPath]);

  // BUG FIX: guard against onInputChange being undefined (crashes on Profile, Insights, etc.)
  const handleInputChange = (e) => {
    setSearchValue(e.target.value);
    if (typeof onInputChange === "function") {
      onInputChange(e.target.value);
    }
  };

  return (
    <nav className="bg-child-bg-color text-heading-color flex flex-col px-4 md:flex-row items-center justify-between mx-4 md:mx-20 mt-4 rounded-md py-3 md:py-4 drop-shadow-2xl font-chakra-petch relative">
      
      {/* Left Section */}
      <div className="hidden md:flex items-center space-x-4">
        <button className="hover:text-gray-300 transition">
          <Link to={`/${page?.route || ""}`}>{page?.name || "Home"}</Link>
        </button>
        <div className="w-px h-6 bg-gray-400" />
        <Link className="hover:text-gray-300 transition" to="/insights">Insights</Link>
      </div>

      {/* Center - Brand */}
      <div className="text-center font-bold text-lg md:text-2xl tracking-wide cursor-pointer">
        <Link to="/">Expense Assist App</Link>
      </div>

      {/* Right Section - Desktop */}
      <div className="hidden md:flex flex-row items-center space-x-6">
        {searchEnabled && (
          <input
            type="text"
            placeholder="Search expenses..."
            value={searchValue}
            onChange={handleInputChange}
            className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded w-48 focus:outline-none focus:ring focus:ring-yellow-500"
          />
        )}
        <div className="w-px h-6 bg-gray-400" />
        <Link to="/about">
          <button className="hover:text-gray-300 transition whitespace-nowrap">About &amp; Projects</button>
        </Link>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="absolute top-3 right-4 md:hidden focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
          strokeWidth={2} stroke="currentColor" className="w-6 h-6 text-heading-color">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M3 12h18m-6 6h6" />
        </svg>
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="flex flex-col items-center mt-3 space-y-3 w-full md:hidden pb-2">
          <Link className="hover:text-gray-300 transition" to={`/${page?.route || ""}`}
            onClick={() => setIsMenuOpen(false)}>
            {page?.name || "Home"}
          </Link>
          <Link className="hover:text-gray-300 transition" to="/insights"
            onClick={() => setIsMenuOpen(false)}>Insights</Link>
          <Link className="hover:text-gray-300 transition" to="/about"
            onClick={() => setIsMenuOpen(false)}>About &amp; Projects</Link>
          {searchEnabled && (
            <input
              type="text"
              placeholder="Search expenses..."
              value={searchValue}
              onChange={handleInputChange}
              className="bg-gray-800 text-white placeholder-gray-400 px-4 py-2 rounded w-full focus:outline-none focus:ring focus:ring-yellow-500"
            />
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;