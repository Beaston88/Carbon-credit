// src/components/PurchaseCredit.jsx
import React from "react";
import { useCarbonCredit } from "../../context/contextAPI";

const PurchaseCredit = () => {
  const {
    purchaseForm,
    handlePurchaseFormChange,
    purchaseCredits,
    isLoading,
    carbonCreditPrice,
    totalPoolCredits
  } = useCarbonCredit();

  const handleSubmit = (e) => {
    e.preventDefault();
    purchaseCredits();
  };

  const calculateTotal = () => {
    if (!purchaseForm.amount) return "0";
    return (parseFloat(purchaseForm.amount) * parseFloat(carbonCreditPrice)).toFixed(6);
  };

  return (
    <div className="form-card">
      <h2>Purchase Carbon Credits</h2>
      <p>Current Price: {carbonCreditPrice} ETH per credit</p>
      <p>Available Credits: {totalPoolCredits}</p>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount to Purchase</label>
          <input
            type="number"
            placeholder="Amount"
            max={totalPoolCredits}
            value={purchaseForm.amount}
            onChange={(e) => handlePurchaseFormChange(e, "amount")}
          />
        </div>
        <div className="form-group">
          <label>Total Cost (ETH)</label>
          <input
            type="text"
            readOnly
            value={calculateTotal()}
          />
        </div>
        <button
          type="submit"
          className="submit-btn"
          disabled={isLoading || !purchaseForm.amount || purchaseForm.amount <= 0}
        >
          {isLoading ? "Processing..." : "Purchase Credits"}
        </button>
      </form>
    </div>
  );
};

export default PurchaseCredit;