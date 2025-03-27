import React, { useEffect, useState } from "react";
import { projects } from "../Constants/index.js";
import { apiURL } from "../Constants/index.js";
import axios from "axios";
import { getAuth } from "firebase/auth";

const GovtDashboard = () => {
  // const [projects, setProjects] = useState([]);

  // const fetchProjects = async () => {
  //   const response = await axios.get(apiURL + "/marketplace?verified=false", {
  //     headers: {
  //       Authorization: `Bearer ${token}`, // firebase trokn
  //     },
  //   });
  // };

  // useEffect -> lagake on page load de dena

  const getFirebaseToken = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      return await user.getIdToken();
    }
    throw new Error("User not authenticated");
  };

  const fetchProjects = async () => {
    try {
      // setLoading(true);
      const token = await getFirebaseToken();
      const response = await axios.get(apiURL + "/marketplace?verified=false", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      // setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
      // Use mock data as fallback
      // setProjects(mockProjects);
    } finally {
      // setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleVerify = async (id) => {
    const response = await axios.post(
      apiURL + "/government/verify/" + id,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // firebase token
        },
      }
    );
  };

  const getVerified = async () => {
    const response = await axios.get(apiURL + "/government/verified-listings", {
      headers: {
        Authorization: `Bearer ${token}`, // firebase token
      },
    });
    const data = await response.data();
    console.log(data);
  };

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
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={(id) => handleVerify(id)}
          >
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
