import React from "react";
import { FiBell, FiMessageSquare, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <header className="flex items-center justify-between w-full px-6 py-4 bg-white text-black shadow-lg rounded-none max-md:flex-col max-md:items-start max-md:gap-4">
      {/* Left: Logo */}
      <Link to="/" className="text-2xl font-bold hover:text-gray-300 transition max-md:text-xl">
        Carbon Chain
      </Link>

      {/* Center: Search Bar */}
      <div className="flex-1 flex justify-center max-md:w-full max-md:justify-start">
        <input
          type="text"
          placeholder="Search for Carbon Credits"
          className="w-2/3 p-2 border text-black rounded-none max-md:w-full"
        />
      </div>

      {/* Right: Navigation Links & Icons */}
      <div className="flex items-center gap-6 max-md:gap-3 max-md:flex-wrap">
        <Link to="/listings" className="hover:text-gray-300 transition max-md:text-sm">Listings</Link>
        <Link to="/verify" className="hover:text-gray-300 transition max-md:text-sm">Verify</Link>
        <Link to="/profile" className="hover:text-gray-300 transition max-md:text-sm">Profile</Link>

        {/* Icons */}
        <button className="text-lg cursor-pointer hover:text-gray-300 transition max-md:text-base">
          <FiBell />
        </button>
        <button className="text-lg cursor-pointer hover:text-gray-300 transition max-md:text-base">
          <FiMessageSquare />
        </button>
        <button className="text-lg cursor-pointer hover:text-gray-300 transition max-md:text-base">
          <FiUser />
        </button>
      </div>
    </header>
  );
};

export default NavigationBar;
