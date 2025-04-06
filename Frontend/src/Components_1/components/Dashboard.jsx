import React from "react";
import { useCarbonCredit } from "../../context/contextAPI";
import AddCredit from "./AddCredit";
import PurchaseCredit from "./PurchaseCredit";
import TransactionHistory from "./TransactionHistory";
import PoolInfo from "./PoolInfo";
import GovernmentPanel from "./GovernmentPanel";

const Dashboard = () => {
  const { 
    currentAccount, 
    connectWallet,
    isGovernment,
    isLoading
  } = useCarbonCredit();

  if (!window.ethereum) {
    return (
      <div className="centered-page">
        <div className="prompt-card">
          <h2>MetaMask Required</h2>
          <p>To use this carbon credit marketplace, please install the MetaMask wallet extension.</p>
          <a 
            href="https://metamask.io/download.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="primary-btn"
          >
            Install MetaMask
          </a>
          <p className="small-text">After installation, refresh this page</p>
        </div>
      </div>
    );
  }

  if (!currentAccount) {
    return (
      <div className="centered-page">
        <div className="prompt-card">
          <h2>Welcome to Carbon Credit Marketplace</h2>
          <p>Connect your wallet to start trading carbon credits</p>
          <button 
            onClick={connectWallet} 
            className="primary-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Connecting...' : 'Connect Wallet'}
          </button>
          <p className="small-text">
            Don't have a wallet? <a href="https://metamask.io/" target="_blank" rel="noopener">Learn more</a>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="dashboard-content">
        <PoolInfo />
        <div className="action-grid">
          <AddCredit />
          <PurchaseCredit />
        </div>
        <TransactionHistory />
        {isGovernment && <GovernmentPanel />}
      </div>
    </div>
  );
};

export default Dashboard;