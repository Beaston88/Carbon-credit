"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "../components/AppContext";
import { useNavigate } from "react-router-dom";
import { AppProvider } from "../components/AppContext";

function AddCreditPageContent() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  
  // Safely access context
  const context = useAppContext();
  const saveNewCredit = context?.saveNewCredit;

  
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    age: "",
    oxygenAmount: "",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/5fbd3bc12cb2d9bb2fc89244890b64f7b7988aa0b609244191ac7f1c0c9aa942",
  });

  // Check if context is available
  useEffect(() => {
    if (!context || !saveNewCredit) {
      console.error("Context or saveNewCredit function is not available");
      setError("Context not available. Please check your implementation.");
    }
  }, [context, saveNewCredit]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      if (!saveNewCredit) {
        throw new Error("saveNewCredit function is not available");
      }

      // Create a new credit with a unique ID and transaction ID
      const newCredit = {
        ...formData,
        id: `${Math.floor(Math.random() * 1000)}-${Math.floor(
          Math.random() * 1000
        )}`,
        transactionId: `SK${Math.floor(Math.random() * 100)}-${Math.floor(
          Math.random() * 100
        )}`,
      };

      // Save the new credit to the context
      saveNewCredit(newCredit);

      // Redirect to the dashboard or pool page after submission
      navigate("/pool");
    } catch (err) {
      console.error("Error submitting form:", err);
      setError(`Error: ${err.message}`);
    }
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto p-8 bg-red-100 text-red-700 rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>{error}</p>
        <button
          onClick={() => navigate("/pool")}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Return to Pool
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">Add New Carbon Credit</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="new-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="new-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Oak Tree"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="new-area"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Area
            </label>
            <input
              type="text"
              id="new-area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              placeholder="e.g., 5 acre"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="new-age"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Age
            </label>
            <input
              type="text"
              id="new-age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              placeholder="e.g., 50 year old"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="new-oxygenAmount"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Amount of O2
            </label>
            <input
              type="text"
              id="new-oxygenAmount"
              name="oxygenAmount"
              value={formData.oxygenAmount}
              onChange={handleChange}
              placeholder="e.g., 8,000 pounds"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate("/pool")}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
            >
              Add Credit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Wrapper component that provides the context
function AddCreditPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <AppProvider>
        <AddCreditPageContent />
      </AppProvider>
    </div>
  );
}

export default AddCreditPage;