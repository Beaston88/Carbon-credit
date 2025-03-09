import React from "react";
import {
  FiHome,
  FiShoppingCart,
  FiCreditCard,
  FiSettings,
  FiLogOut,
  FiMessageSquare,
  FiUser,
  FiBell,
  FiUsers,
} from "react-icons/fi";
import { pendingVerifications } from "../Constants/index.js";

const Dashboard = () => {
  return (
    //Sidebar
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 h-screen bg-green-600 text-white p-6 flex flex-col justify-between fixed left-0 top-0 overflow-hidden">
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

      <div className="flex-1 p-8 ml-64">
        <header className="flex justify-between items-center mb-6">
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

        {/* Main left & right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left */}
          <div>
            <h2 className="text-2xl font-semibold mt-8">
              Good Morning, Carbonchain User
            </h2>
            <p className="text-gray-600">
              Explore your impacts and progress in the marketplace
            </p>
            <button className="mt-3 px-4 py-2 bg-gray-200 rounded-2xl">
              Settings
            </button>

            <div className="grid grid-cols-2 gap-4 my-6">
              <div className="bg-black text-white p-4 rounded-lg">
                <p>Upcoming</p>
                <p>Current week</p>
                <p className="flex items-center gap-3 text-lg mt-3">
                  <FiUsers /> Seller
                </p>
              </div>
              <div className="bg-black text-white p-4 rounded-lg">
                <p>Upcoming</p>
                <p>Current week</p>
                <p className="flex items-center gap-3 text-lg mt-3">
                  <FiUsers /> Buyer
                </p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">
              Total Transaction Hours
            </h3>
            <div className="p-4">
              <p className="text-gray-500">chart</p>
            </div>
          </div>

          {/* right */}
          <div>
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-green-500 text-white p-4 rounded-lg">
                <p className="text-3xl font-bold flex justify-center">81</p>
                <p className="flex justify-center">Track your daily impact</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg flex justify-center items-center">
                <p className="text-center">Verify your carbon transaction</p>
              </div>
              <div className="bg-green-500 text-white p-4 rounded-lg flex justify-center items-center">
                <p className="text-center">Frequently asked questions</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold mb-4">
              December 2024 Activity
            </h3>
            <div className="flex justify-between mb-6">
              {["Dec 1", "Dec 2", "Dec 3", "Dec 4", "Dec 5", "Dec 6"].map(
                (date) => (
                  <button
                    key={date}
                    className="px-4 py-2 bg-gray-200 rounded-xl"
                  >
                    {date}
                  </button>
                )
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Pending Verifications
              </h3>
              <ul className="space-y-4">
                {pendingVerifications.map((item) => (
                  <li
                    key={item.id}
                    className="flex justify-between items-center"
                  >
                    <div className="flex items-center space-x-4">
                      <span className="bg-gray-300 text-black px-3 py-2 rounded-lg font-semibold">
                        {item.id}
                      </span>
                      <div>
                        <p className="font-semibold">{item.title}</p>
                        <p className="text-sm text-gray-600">{item.details}</p>
                      </div>
                    </div>
                    <p className="text-gray-800">{item.time}</p>
                  </li>
                ))}
              </ul>
              <div className="flex justify-center items-center">
                <button className="mt-5 px-4 py-2 bg-gray-300 rounded-2xl w-1/2 cursor-pointer hover:bg-gray-400">
                  View full schedule
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
