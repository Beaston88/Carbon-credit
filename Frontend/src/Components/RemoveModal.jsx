"use client";
import React from "react";
import Modal from "./Modal";
import { useAppContext } from "./AppContext";

function RemoveModal() {
  const {
    showRemoveModal,
    setShowRemoveModal,
    confirmRemoveCredit,
    carbonCredit,
  } = useAppContext();

  return (
    <Modal
      isOpen={showRemoveModal}
      onClose={() => setShowRemoveModal(false)}
      title="Confirm Removal"
    >
      <div className="text-center">
        <p className="mb-6 text-lg">
          Are you sure you want to remove the carbon credit for{" "}
          {carbonCredit.name}?
          <br />
          <span className="text-gray-600 text-sm">
            Credit ID: {carbonCredit.id}
          </span>
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => setShowRemoveModal(false)}
            className="px-6 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={confirmRemoveCredit}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Remove
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default RemoveModal;
