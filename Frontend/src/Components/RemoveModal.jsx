"use client";
import React from "react";
import Modal from "./Modal";
import { useAppContext } from "./AppContext";

function RemoveModal() {
  const {
    showRemoveModal,
    setShowRemoveModal,
    carbonCredit,
    isVerificationSent,
    removeCredit, 
  } = useAppContext();

  
  const handleRemove = () => {
    if (carbonCredit && carbonCredit.id) {
      removeCredit(carbonCredit.id);
    }
  };

  
  if (!showRemoveModal) return null;

  return (
    <Modal
      isOpen={showRemoveModal}
      onClose={() => setShowRemoveModal(false)}
      title="Confirm Removal"
    >
      <div className="text-center">
        <p className="mb-6 text-lg text-gray-700">
          Are you sure you want to remove the carbon credit for{" "}
          <strong>{carbonCredit?.name || "this item"}</strong>?
        </p>

        <div className="flex justify-center gap-4">
          
          <button
            onClick={() => setShowRemoveModal(false)}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>

          
          <button
            onClick={handleRemove}
            disabled={isVerificationSent}
            className={`px-6 py-2 ${
              isVerificationSent
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600 text-white"
            } rounded-lg transition`}
          >
            {isVerificationSent ? "❌ Disabled" : "Remove"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveModal;
