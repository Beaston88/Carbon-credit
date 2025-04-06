

import React, { useState } from "react";
import { useCarbonCredit } from "../../context/contextAPI";
import { ethers } from "ethers";

const AddCredit = () => {
  const {
    addCreditForm,
    handleAddCreditFormChange,
    addCreditToPool,
    isLoading,
    currentAccount,
    isMetaMaskInstalled,
    connectWallet,
    error: contextError
  } = useCarbonCredit();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
  
    try {
      // Validate amount
      if (!addCreditForm.amount || Number(addCreditForm.amount) <= 0) {
        throw new Error("Please enter a valid amount greater than 0");
      }
  
      // Validate address
      if (!addCreditForm.paymentAddress) {
        throw new Error("Payment address is required");
      }
  
      if (!ethers.isAddress(addCreditForm.paymentAddress)) {
        throw new Error("Please enter a valid Ethereum address starting with 0x");
      }
  
      // Show pending state
      setSuccess("Transaction submitted - waiting for confirmation...");
      
      // Execute transaction
      await addCreditToPool();
      
      // Update success message
      setSuccess(`${addCreditForm.amount} credits successfully added to the pool!`);
      
      // Reset form
      handleAddCreditFormChange({ target: { value: '' } }, "amount");
      handleAddCreditFormChange({ target: { value: '' } }, "paymentAddress");
  
    } catch (err) {
      console.error("Error adding credits:", err);
      setError(err.message || "Failed to add credits. Please try again.");
    }
  };

  if (!currentAccount) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Carbon Credits to Pool
        </h2>
        <div className="bg-blue-50 rounded-lg p-4 text-center text-blue-800">
          {isMetaMaskInstalled ? (
            <button
              onClick={connectWallet}
              className="w-full py-3 px-4 rounded-lg font-medium text-white bg-green-600 hover:bg-green-700 transition-colors"
            >
              Connect Wallet to Continue
            </button>
          ) : (
            <>
              <p className="mb-4">Please install MetaMask to interact with the blockchain</p>
              <a
                href="https://metamask.io/download.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block py-2 px-4 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Install MetaMask
              </a>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Add Carbon Credits to Pool
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Amount of Credits
          </label>
          <input
            type="number"
            min="1"
            step="1"
            placeholder="Amount"
            value={addCreditForm.amount}
            onChange={(e) => handleAddCreditFormChange(e, "amount")}
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              error && !addCreditForm.amount ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Payment Address
          </label>
          <input
            type="text"
            placeholder="0x..."
            value={addCreditForm.paymentAddress}
            onChange={(e) => handleAddCreditFormChange(e, "paymentAddress")}
            disabled={isLoading}
            className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${
              error && !addCreditForm.paymentAddress ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 rounded-lg border-l-4 border-red-500">
            {error}
          </div>
        )}

        {success && (
          <div className="p-3 bg-green-50 text-green-700 rounded-lg border-l-4 border-green-500">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !addCreditForm.amount || !addCreditForm.paymentAddress}
          className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
            isLoading || !addCreditForm.amount || !addCreditForm.paymentAddress
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Processing...
            </div>
          ) : (
            "Add Credits"
          )}
        </button>
      </form>
    </div>
  );
};

export default AddCredit;