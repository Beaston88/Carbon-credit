import React, { useState } from "react";
import {
  FiMonitor,
  FiHome,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiX,
  FiMenu,
} from "react-icons/fi";

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <button
        className="md:hidden p-2 fixed top-4 left-4 z-50"
        onClick={toggleSidebar}
      >
        <FiMenu size={24} />
      </button>

      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-green-600 text-white p-6 flex flex-col justify-between z-50 transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:relative md:translate-x-0`}
      >
        <button
          className="md:hidden absolute top-4 right-4 text-white"
          onClick={toggleSidebar}
        >
          <FiX size={24} />
        </button>

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

        <button className="flex items-center gap-3 text-lg hover:text-gray-300">
          <FiLogOut /> Sign out
        </button>
      </aside>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 backdrop-brightness-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
