"use client";
import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAppContext } from "./AppContext";

function ModifyModal() {
  const {
    showModifyModal,
    setShowModifyModal,
    saveModifiedCredit,
    carbonCredits, // <-- Updated to use the array
    selectedCreditId, // <-- New state to get the selected credit ID
  } = useAppContext();

  const selectedCredit = carbonCredits.find((credit) => credit.id === selectedCreditId);

  const [formData, setFormData] = useState({
    name: "",
    area: "",
    age: "",
    oxygenAmount: "",
  });

  useEffect(() => {
    if (selectedCredit) {
      setFormData({
        name: selectedCredit.name,
        area: selectedCredit.area,
        age: selectedCredit.age,
        oxygenAmount: selectedCredit.oxygenAmount,
      });
    }
  }, [selectedCredit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveModifiedCredit({ ...selectedCredit, ...formData }); // <-- Save modified credit
    setShowModifyModal(false);
  };

  if (!showModifyModal || !selectedCredit) return null;

  return (
    <Modal
      isOpen={showModifyModal}
      onClose={() => setShowModifyModal(false)}
      title="Modify Carbon Credit"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="area" className="block text-sm font-medium text-gray-700 mb-1">
            Area
          </label>
          <input
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
            Age
          </label>
          <input
            type="text"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="oxygenAmount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Amount of O₂
          </label>
          <input
            type="text"
            id="oxygenAmount"
            name="oxygenAmount"
            value={formData.oxygenAmount}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-lime-500"
            required
          />
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => setShowModifyModal(false)}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-lime-600 text-white rounded-lg hover:bg-lime-700 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </Modal>
  );
}

export default ModifyModal;
