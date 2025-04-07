import React from "react";
import { useCarbonCredit } from "../../context/contextAPI";

const Navbar = () => {
  const { connectWallet, currentAccount, isLoading } = useCarbonCredit();

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="logo-container">
          <h1 className="logo">Carbon Credit Marketplace</h1>
        </div>
        
        <div className="wallet-info">
          {!currentAccount ? (
            <button 
              onClick={connectWallet} 
              className="connect-wallet-btn"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="spinner"></span>
                  Connecting...
                </>
              ) : (
                <>
                  <span className="wallet-icon"></span>
                  Connect Wallet
                </>
              )}
            </button>
          ) : (
            <div className="account-info">
              <span className="account-address">
                {currentAccount.slice(0, 6)}...{currentAccount.slice(-4)}
              </span>
              <span className="connection-status">
                <span className="status-dot connected"></span>
                Connected
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;