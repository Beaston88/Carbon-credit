import React, { useEffect, useState } from "react";
import { getVerifiedListings, verifyListing } from "../api/government.js";
import { auth } from "../firebaseConfig";

const GovtDashboard = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getFirebaseToken = async () => {
    const user = auth.currentUser;
    if (user) {
      console.log("Current User:", user);
      return await user.getIdToken();
    }
    throw new Error("User not authenticated");
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = await getFirebaseToken();
      const response = await getVerifiedListings(token, false);
      console.log(response);
      setProjects(response.data);
    } catch (err) {
      console.error("Error fetching projects:", err);
      setError("Failed to load projects");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const checkAuthAndFetch = async () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          fetchProjects();
        } else {
          setError("User not authenticated");
          setLoading(false);
        }
      });
    };
    checkAuthAndFetch();
  }, []);

  const handleVerify = async (id) => {
    try {
      const token = await getFirebaseToken();
      await verifyListing(token, id);
      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error("Error verifying project:", err);
      setError("Failed to verify listing");
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col overflow-y-auto overflow-x-hidden">
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-4xl font-bold">Carbon Credit Listings</h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-200 p-4 rounded-lg shadow"
                >
                  <h3 className="font-bold">
                    {project.name}_{project.gstin}
                  </h3>
                  <p className="text-sm text-gray-700">
                    <strong>Energy Produced:</strong> {project.energyProduced}{" "}
                    MWh
                    <br />
                    <strong>Grid Factor:</strong> {project.gridFactor}
                    <br />
                    <strong>Forest Area:</strong> {project.forestArea || "N/A"}
                    <br />
                    <strong>Sequestration Rate:</strong>{" "}
                    {project.sequestrationRate} tons/year
                    <br />
                    <strong>Methane Captured:</strong>{" "}
                    {project.methaneCaptured || "N/A"}
                    <br />
                    <strong>Baseline Emissions:</strong>{" "}
                    {project.baselineEmissions || "N/A"}
                    <br />
                    <strong>Actual Emissions:</strong>{" "}
                    {project.actualEmissions || "N/A"}
                    <br />
                    <strong>Fuel Saved:</strong> {project.fuelSaved || "N/A"}
                  </p>
                  <div className="mt-4 flex gap-2">
                    <button className="w-5/7 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
                      View Details
                    </button>
                    <button
                      className="w-2/7 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                      onClick={() => handleVerify(project.id)}
                    >
                      Verify
                    </button>
                  </div>
                </div>
              ))}
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
          </>
        )}
      </div>
    </div>
  );
};

export default GovtDashboard;
