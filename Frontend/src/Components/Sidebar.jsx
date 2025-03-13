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

const Sidebar = ({ closeSidebar }) => {
  return (
    <aside className="w-64 h-screen bg-green-600 text-white p-6 flex flex-col justify-between">
      <nav className="space-y-4">
        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-gray-300"
          onClick={closeSidebar}
        >
          <FiMonitor /> Dashboard
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-gray-300"
          onClick={closeSidebar}
        >
          <FiHome /> Pool
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-gray-300"
          onClick={closeSidebar}
        >
          <FiShoppingCart /> Transaction
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-gray-300"
          onClick={closeSidebar}
        >
          <FiCreditCard /> Credits
        </a>
        <a
          href="#"
          className="flex items-center gap-3 text-lg hover:text-gray-300"
          onClick={closeSidebar}
        >
          <FiSettings /> Accounts
        </a>
      </nav>

      <button
        className="flex items-center gap-3 text-lg hover:text-gray-300"
        onClick={closeSidebar}
      >
        <FiLogOut /> Sign out
      </button>
    </aside>
  );
};

const Header = () => {
  return (
    <header className="flex justify-between items-center w-full p-4">
      <input
        type="text"
        placeholder="Search for Carbon Credits"
        className="w-1/2 p-2 border rounded-xl"
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
