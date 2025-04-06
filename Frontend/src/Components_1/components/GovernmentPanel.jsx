// src/components/GovernmentPanel.jsx
import React, { useState } from "react";
import { useCarbonCredit } from "../../context/contextAPI";

const GovernmentPanel = () => {
  const { updateCarbonCreditPrice, transferGovernment, carbonCreditPrice, isLoading } = useCarbonCredit();
  
  const [newPrice, setNewPrice] = useState("");
  const [newGovernment, setNewGovernment] = useState("");

  const handlePriceUpdate = (e) => {
    e.preventDefault();
    if (newPrice) {
      updateCarbonCreditPrice(newPrice);
      setNewPrice("");
    }
  };

  const handleTransfer = (e) => {
    e.preventDefault();
    if (newGovernment) {
      transferGovernment(newGovernment);
      setNewGovernment("");
    }
  };

  return (
    <div className="government-panel">
      <h2>Government Controls</h2>
      <div className="admin-actions">
        <div className="form-card">
          <h3>Update Credit Price</h3>
          <p>Current Price: {carbonCreditPrice} ETH</p>
          <form onSubmit={handlePriceUpdate}>
            <div className="form-group">
              <input
                type="number"
                step="0.000001"
                placeholder="New Price (ETH)"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading || !newPrice}>
              {isLoading ? "Updating..." : "Update Price"}
            </button>
          </form>
        </div>

        <div className="form-card">
          <h3>Transfer Government Role</h3>
          <form onSubmit={handleTransfer}>
            <div className="form-group">
              <input
                type="text"
                placeholder="New Government Address"
                value={newGovernment}
                onChange={(e) => setNewGovernment(e.target.value)}
              />
            </div>
            <button type="submit" disabled={isLoading || !newGovernment}>
              {isLoading ? "Transferring..." : "Transfer Role"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default GovernmentPanel;