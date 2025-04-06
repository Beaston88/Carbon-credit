import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../Components/Sidebar.jsx";
import Header from "../Components/Header.jsx";
import { getUser } from "../api/user.js";
import { createMarketplaceItem } from "../api/marketplace.js";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";

function AddCreditPage() {
  const navigate = useNavigate();
  const [sector, setSector] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [formData, setFormData] = useState({
    energyProduced: "",
    gridFactor: 0.7,
    forestArea: "",
    sequestrationRate: 5,
    methaneCaptured: "",
    baselineEmissions: "",
    actualEmissions: "",
    fuelSaved: "",
  });
  const [result, setResult] = useState("");
  const [userGST, setUserGST] = useState("");

  const handleSectorChange = (e) => {
    setSector(e.target.value);
    setImageLink("");
  };

  const handleImageLinkChange = (e) => {
    setImageLink(e.target.value);
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const calculateCredits = () => {
    let credits = 0;
    switch (sector) {
      case "renewable":
        credits =
          parseFloat(formData.energyProduced || 0) *
          parseFloat(formData.gridFactor || 0.7);
        break;
      case "forestry":
        credits =
          parseFloat(formData.forestArea || 0) *
          parseFloat(formData.sequestrationRate || 5);
        break;
      case "waste":
        credits = parseFloat(formData.methaneCaptured || 0) * 25;
        break;
      case "industry":
        credits =
          parseFloat(formData.baselineEmissions || 0) -
          parseFloat(formData.actualEmissions || 0);
        break;
      case "transport":
        credits = parseFloat(formData.fuelSaved || 0) * 2.3;
        break;
      default:
        credits = 0;
    }
    setResult(`Estimated Carbon Credits: ${credits.toFixed(2)} tCO₂e`);
    return credits;
  };

  const handleAddCredit = async () => {
    if (!result) {
      alert("Please calculate credits first");
      return;
    }

    try {
      const credits = calculateCredits();

      const auth = getAuth();
      return new Promise((resolve, reject) => {
        const unsubscribe = onAuthStateChanged(
          auth,
          async (user) => {
            unsubscribe();

            if (user) {
              try {
                const token = await getIdToken(user);

                if (!token) {
                  throw new Error("No authentication token available");
                }

                const userData = await getUser(token);

                const itemData = {
                  name: `${userData.data.gst} - ${sector}`,
                  description: JSON.stringify(formData),
                  image: imageLink || "https://placeholder.com/350x350",
                  credits: credits.toFixed(2),
                  price: "10",
                };

                const createdItem = await createMarketplaceItem(
                  token,
                  itemData
                );

                console.log(createdItem);

                resolve(createdItem);
              } catch (error) {
                console.error("Failed to add credit to marketplace", error);
                alert("Failed to add credit to marketplace");
                reject(error);
              }
            } else {
              alert("Please sign in");
              reject(new Error("User not authenticated"));
            }
          },
          reject
        );
      });
    } catch (error) {
      console.error("Unexpected error in add credit process", error);
      alert("An unexpected error occurred");
      throw error;
    }
  };

  const handleCancel = () => {
    setSector("");
    setImageLink("");
    setFormData({
      energyProduced: "",
      gridFactor: 0.7,
      forestArea: "",
      sequestrationRate: 5,
      methaneCaptured: "",
      baselineEmissions: "",
      actualEmissions: "",
      fuelSaved: "",
    });
    setResult("");
  };

  const renderSectorFields = () => {
    return (
      <>
        {sector && (
          <div className="mb-4">
            <label
              htmlFor="imageLink"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Project Image Link:
            </label>
            <input
              type="url"
              id="imageLink"
              value={imageLink}
              onChange={handleImageLinkChange}
              placeholder="Enter a URL for your project image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            />
            {imageLink && (
              <div className="mt-2">
                <img
                  src={imageLink}
                  alt="Project"
                  className="max-w-full h-auto rounded-md border"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.textContent = "Invalid image URL";
                  }}
                />
                <p className="text-sm text-gray-500 mt-1"></p>
              </div>
            )}
          </div>
        )}

        {(() => {
          switch (sector) {
            case "renewable":
              return (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="energyProduced"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Energy Produced (MWh):
                    </label>
                    <input
                      type="number"
                      id="energyProduced"
                      value={formData.energyProduced}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="gridFactor"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Grid Emission Factor (tCO₂/MWh, default 0.7):
                    </label>
                    <input
                      type="number"
                      id="gridFactor"
                      value={formData.gridFactor}
                      onChange={handleInputChange}
                      step="0.01"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>
              );
            case "forestry":
              return (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="forestArea"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Forest Area (Hectares):
                    </label>
                    <input
                      type="number"
                      id="forestArea"
                      value={formData.forestArea}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="sequestrationRate"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Sequestration Rate (tCO₂/ha/year, default 5):
                    </label>
                    <input
                      type="number"
                      id="sequestrationRate"
                      value={formData.sequestrationRate}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>
              );
            case "waste":
              return (
                <div className="mb-4">
                  <label
                    htmlFor="methaneCaptured"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Methane Captured (tonnes):
                  </label>
                  <input
                    type="number"
                    id="methaneCaptured"
                    value={formData.methaneCaptured}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              );
            case "industry":
              return (
                <div>
                  <div className="mb-4">
                    <label
                      htmlFor="baselineEmissions"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Baseline Emissions (tCO₂e):
                    </label>
                    <input
                      type="number"
                      id="baselineEmissions"
                      value={formData.baselineEmissions}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="actualEmissions"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Actual Emissions (tCO₂e):
                    </label>
                    <input
                      type="number"
                      id="actualEmissions"
                      value={formData.actualEmissions}
                      onChange={handleInputChange}
                      step="0.1"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                    />
                  </div>
                </div>
              );
            case "transport":
              return (
                <div className="mb-4">
                  <label
                    htmlFor="fuelSaved"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Fuel Saved (Litres):
                  </label>
                  <input
                    type="number"
                    id="fuelSaved"
                    value={formData.fuelSaved}
                    onChange={handleInputChange}
                    step="0.1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              );
            default:
              return null;
          }
        })()}
      </>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-auto h-full p-4 md:p-8">
        <Header />
        <div className="p-4 md:p-8 overflow-auto flex justify-center">
          <div className="w-[60%] max-w-4xl p-8 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6">Add Credits</h1>

            <div className="mb-4">
              <label
                htmlFor="sector"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Sector:
              </label>
              <select
                id="sector"
                value={sector}
                onChange={handleSectorChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                <option value="">--Select--</option>
                <option value="renewable">Renewable Energy</option>
                <option value="forestry">Forestry</option>
                <option value="waste">Waste Management</option>
                <option value="industry">Industry & Manufacturing</option>
                <option value="transport">Transport</option>
              </select>
            </div>

            {renderSectorFields()}

            <button
              onClick={calculateCredits}
              className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors mb-4"
              disabled={!sector}
            >
              Calculate Carbon Credits
            </button>

            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="px-3 py-1 text-sm bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddCredit}
                className="px-3 py-1 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                disabled={!result}
              >
                Add Credit
              </button>
            </div>

            {result && (
              <h3 className="mt-4 text-xl font-semibold text-center text-gray-700">
                {result}
              </h3>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCreditPage;
