import React from "react";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import { FiUsers } from "react-icons/fi";
import { pendingVerifications } from "../Constants/index.js";

const Dashboard = () => {
  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />

        <div className="p-4 md:p-8 overflow-auto">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Left */}
            <div>
              <h2 className="text-2xl font-semibold mt-4">
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

            {/* Right */}
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 mt-10">
                <div className="bg-green-500 text-white p-4 rounded-lg text-center">
                  <p className="text-3xl font-bold">81</p>
                  <p>Track your daily impact</p>
                </div>
                <div className="flex justify-center items-center bg-green-500 text-white p-4 rounded-lg text-center">
                  <p>Verify your carbon transaction</p>
                </div>
                <div className="flex justify-center items-center bg-green-500 text-white p-4 rounded-lg text-center">
                  <p>Frequently asked questions</p>
                </div>
              </div>

              <h3 className="text-lg font-semibold mb-4">
                December 2024 Activity
              </h3>
              <div className="flex flex-wrap gap-2 mb-6">
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

              <div className="flex justify-center">
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
