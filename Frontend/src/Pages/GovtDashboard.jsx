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
      // console.log("Current User:", user);
      return await user.getIdToken();
    }
    throw new Error("User not authenticated");
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const token = await getFirebaseToken();
      const response = await getVerifiedListings(token, false);
      // console.log(response);
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
        prevProjects.filter((project) => project.id !== id),
      );
    } catch (err) {
      console.error("Error verifying project:", err);
      setError("Failed to verify listing");
    }
  };

  return (
    <div className="font-mono">
      <div className="flex-1 flex flex-col p-6">
        <h2 className="text-4xl font-bold">
          Carbon Credit Listings (govt only)
        </h2>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <div className="mx-5 grid grid-cols-1 md:grid-cols-2 gap-10 mt-5">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-gray-200 p-4 rounded-xl shadow"
                >
                  <h3 className="font-bold">
                    {project.name}_{project.gstin}
                  </h3>
                  <p className="text-sm text-gray-700 mt-2 h-16">
                    <strong>Sector:</strong>{" "}
                    {JSON.parse(project.description).sector}
                    <br />
                    {JSON.parse(project.description).sector === "renewable" && (
                      <>
                        <strong>Energy Produced:</strong>{" "}
                        {JSON.parse(project.description).energyProduced ||
                          "N/A"}{" "}
                        MWh
                        <br />
                        <strong>Grid Factor:</strong>{" "}
                        {JSON.parse(project.description).gridFactor || "N/A"}
                      </>
                    )}
                    {JSON.parse(project.description).sector === "forestry" && (
                      <>
                        <strong>Forest Area:</strong>{" "}
                        {JSON.parse(project.description).forestArea || "N/A"} ha
                        <br />
                        <strong>Sequestration Rate:</strong>{" "}
                        {JSON.parse(project.description).sequestrationRate ||
                          "N/A"}{" "}
                        tCO₂/ha/year
                      </>
                    )}
                    {JSON.parse(project.description).sector === "waste" && (
                      <>
                        <strong>Methane Captured:</strong>{" "}
                        {JSON.parse(project.description).methaneCaptured ||
                          "N/A"}{" "}
                        tonnes
                      </>
                    )}
                    {JSON.parse(project.description).sector === "industry" && (
                      <>
                        <strong>Baseline Emissions:</strong>{" "}
                        {JSON.parse(project.description).baselineEmissions ||
                          "N/A"}{" "}
                        tCO₂e
                        <br />
                        <strong>Actual Emissions:</strong>{" "}
                        {JSON.parse(project.description).actualEmissions ||
                          "N/A"}{" "}
                        tCO₂e
                      </>
                    )}
                    {JSON.parse(project.description).sector === "transport" && (
                      <>
                        <strong>Fuel Saved:</strong>{" "}
                        {JSON.parse(project.description).fuelSaved || "N/A"}{" "}
                        litres
                      </>
                    )}
                  </p>
                  <button
                    className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    onClick={() => handleVerify(project.id)}
                  >
                    Verify
                  </button>
                </div>
              ))}
            </div>

            <h2 className="text-xl font-bold mt-12">Administrative Tasks</h2>
            <div className="flex gap-5 mt-3">
              {["Manage Users", "Review Reports", "System Settings"].map(
                (task, index) => (
                  <button
                    key={index}
                    className="bg-green-600 text-white px-4 py-5 rounded text-center hover:bg-green-700 w-full"
                  >
                    {task}
                  </button>
                ),
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GovtDashboard;
