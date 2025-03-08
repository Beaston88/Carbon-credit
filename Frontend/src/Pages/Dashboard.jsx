import React from "react";
import {
  FiHome,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-green-600 text-white p-6 flex flex-col justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-6 tracking-wide">Dashboard</h1>
          <nav className="space-y-4">
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
    </div>
  );
};

export default Dashboard;
