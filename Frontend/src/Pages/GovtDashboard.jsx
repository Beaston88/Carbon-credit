import React from "react";
import { projects } from "../Constants/index.js";

const GovtDashboard = () => {
  return (
    <div className="h-screen w-screen flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-xl font-bold">Carbon Credit Listings</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {projects.map((project) => (
            <div key={project.id} className="bg-gray-200 p-4 rounded-lg shadow">
              <h3 className="font-bold">{project.name}</h3>
              <p className="text-sm text-gray-700">{project.description}</p>
              <button className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                View Details
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-xl font-bold mt-12">Transaction Verification</h2>
        <div className="flex gap-4 mt-5">
          <input
            type="text"
            placeholder="Transaction Id"
            className="flex-1 px-4 py-2 border rounded bg-gray-200 font-bold"
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
            Verify
          </button>
        </div>

        <h2 className="text-xl font-bold mt-12">Administrative Tasks</h2>
        <div className="flex flex-col gap-5 mt-3">
          {["Manage Users", "Review Reports", "System Settings"].map(
            (task, index) => (
              <button
                key={index}
                className="bg-green-600 text-white px-4 py-5 rounded text-center hover:bg-green-700"
              >
                {task}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GovtDashboard;
