"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useAppContext } from "./AppContext";

function ModifyModal() {
  const {
    showModifyModal,
    setShowModifyModal,
    saveModifiedCredit,
    carbonCredit,
  } = useAppContext();

  const [formData, setFormData] = useState({
    name: carbonCredit.name,
    area: carbonCredit.area,
    age: carbonCredit.age,
    oxygenAmount: carbonCredit.oxygenAmount,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    saveModifiedCredit(formData);
  };

  return (
    <Modal
      isOpen={showModifyModal}
      onClose={() => setShowModifyModal(false)}
      title="Modify Carbon Credit"
    >
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="area"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
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
            Amount of O2
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
