import React from "react";
import { FiBell, FiMessageSquare, FiUser } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex items-center w-full px-4 py-2">
      <div className="flex-1 flex justify-center sm:justify-start">
        <input
          type="text"
          placeholder="Search for Carbon Credits"
          className="w-2/3 p-1 sm:p-3 border rounded-xl"
        />
      </div>

      <div className="flex items-center gap-4 ml-2">
        <button className="text-lg cursor-pointer">
          <FiBell />
        </button>
        <button className="text-lg cursor-pointer">
          <FiMessageSquare />
        </button>
        <button className="text-lg cursor-pointer">
          <FiUser />
        </button>
      </div>
    </header>
  );
};

export default Header;
