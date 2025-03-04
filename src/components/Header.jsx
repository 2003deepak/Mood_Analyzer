import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoon, faSun, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'; 
import { Link } from 'react-router-dom';
import themeStore from '../store/themeStore';

const Header = () => {
  const { theme, changeTheme } = themeStore((state) => state);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav
      className={`w-full h-24 fixed top-0 left-0 z-20 flex justify-center items-center border-b shadow-md transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-[#121212] border-gray-600 text-white'
          : 'bg-white border-gray-200 text-black'
      }`}
    >
      <div className="w-full max-w-7xl px-10 h-full flex justify-between items-center">
        {/* Logo */}
        <div className="font-bold text-lg">TradingTick</div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10">
          <Link
            to="/"
            className={`py-2 px-4 rounded-md transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white hover:bg-[#6a4dfa]'
                : 'text-black hover:bg-[#6a4dfa] hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`py-2 px-4 rounded-md transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white hover:bg-[#6a4dfa]'
                : 'text-black hover:bg-[#6a4dfa] hover:text-white'
            }`}
          >
            About
          </Link>
          <Link
            to="/signup"
            className={`py-2 px-4 rounded-md transition-colors duration-300 ${
              theme === 'dark'
                ? 'text-white hover:bg-[#6a4dfa]'
                : 'text-black hover:bg-[#6a4dfa] hover:text-white'
            }`}
          >
            Sign Up
          </Link>

          {/* Theme Switcher */}
          <FontAwesomeIcon
            icon={theme === 'light' ? faMoon : faSun}
            className="cursor-pointer text-xl hover:text-[#6a4dfa] transition-colors duration-300"
            onClick={changeTheme}
          />

          {/* Login Button */}
          <Link
            to="/login"
            className={`py-2 px-6 rounded-md transition duration-300 ${
              theme === 'dark'
                ? 'bg-[#1f1f1f] text-white hover:bg-[#6a4dfa]'
                : 'bg-gray-100 text-black hover:bg-[#6a4dfa] hover:text-white'
            }`}
          >
            Login
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={toggleMobileMenu}
            className="focus:outline-none text-2xl"
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* Mobile Menu (Slide Down) */}
      <div
        className={`absolute top-24 left-0 w-full flex flex-col items-center bg-white dark:bg-[#121212] border-t border-gray-200 dark:border-gray-600 transition-all duration-300 overflow-hidden ${
          isMobileMenuOpen ? 'max-h-[400px] py-4' : 'max-h-0'
        }`}
      >
        <Link
          to="/"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-[#6a4dfa] hover:text-white"
          onClick={toggleMobileMenu}
        >
          Home
        </Link>
        <Link
          to="/about"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-[#6a4dfa] hover:text-white"
          onClick={toggleMobileMenu}
        >
          About
        </Link>
        <Link
          to="/signup"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-[#6a4dfa] hover:text-white"
          onClick={toggleMobileMenu}
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="w-full py-3 text-center transition-colors duration-300 hover:bg-[#6a4dfa] hover:text-white"
          onClick={toggleMobileMenu}
        >
          Login
        </Link>

        {/* Theme Switcher */}
        <div className="w-full py-3 text-center">
          <FontAwesomeIcon
            icon={theme === 'light' ? faMoon : faSun}
            className="cursor-pointer text-xl hover:text-[#6a4dfa] transition-colors duration-300"
            onClick={() => {
              changeTheme();
              toggleMobileMenu(); // Close after changing theme
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Header;
