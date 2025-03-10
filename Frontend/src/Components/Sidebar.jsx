import React from "react";
import {
  FiMonitor,
  FiHome,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiMessageSquare,
  FiUser,
  FiBell,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <aside className="w-64 h-screen bg-green-600 text-white p-6 flex flex-col justify-between fixed left-0 top-0 overflow-hidden">
      <div>
        <nav className="space-y-4">
          <a
            href="#"
            className="flex items-center gap-3 text-lg hover:text-gray-300"
          >
            <FiMonitor /> Dashboard
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-lg hover:text-gray-300"
          >
            <FiHome /> Pool
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-lg hover:text-gray-300"
          >
            <FiShoppingCart /> Transaction
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-lg hover:text-gray-300"
          >
            <FiCreditCard /> Credits
          </a>
          <a
            href="#"
            className="flex items-center gap-3 text-lg hover:text-gray-300"
          >
            <FiSettings /> Accounts
          </a>
        </nav>
      </div>
      <div>
        <button className="flex items-center gap-3 text-lg hover:text-gray-300">
          <FiLogOut /> Sign out
        </button>
      </div>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center p-6">
      <input
        type="text"
        placeholder="Search for Carbon Credits"
        className="w-1/2 p-2 border rounded-4xl"
      />
      <div className="flex items-center gap-4">
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

export { Sidebar, Header };
