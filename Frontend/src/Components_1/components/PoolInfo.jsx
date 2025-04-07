import React, { useEffect, useState } from 'react';
import { useCarbonCredit } from "../../context/contextAPI";


const PoolInfo = () => {
  const { 
    totalPoolCredits, 
    carbonCreditPrice, 
    contributionsCount,
    refreshPoolData,
    isLoading,
    lastRefresh
  } = useCarbonCredit();

  const [lastUpdateTime, setLastUpdateTime] = useState(new Date());

  // Format time display
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  // Update time display periodically
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="pool-info-container">
      <div className="pool-header">
        <div>
          <h2>Carbon Credit Pool</h2>
          <p className="update-time">Live updates: {formatTime(lastUpdateTime)}</p>
        </div>
        <button
          onClick={refreshPoolData}
          disabled={isLoading}
          className={`refresh-button ${isLoading ? 'loading' : ''}`}
        >
          {isLoading ? (
            <>
              <span className="spinner"></span>
              Refreshing...
            </>
          ) : (
            <>
              <span className="refresh-icon">↻</span>
              Refresh Data
            </>
          )}
        </button>
      </div>
      
      <div className="pool-metrics">
        <div className="metric-card available-credits">
          <h3>Available Credits</h3>
          <p className="metric-value">{totalPoolCredits}</p>
          <p className="metric-update">Last updated: {formatTime(lastRefresh)}</p>
        </div>
        
        <div className="metric-card current-price">
          <h3>Current Price</h3>
          <p className="metric-value">{carbonCreditPrice} ETH</p>
          <p className="metric-description">Set by government contract</p>
        </div>
        
        <div className="metric-card active-sellers">
          <h3>Active Sellers</h3>
          <p className="metric-value">{contributionsCount}</p>
          <p className="metric-description">Verified carbon credit providers</p>
        </div>
      </div>

      {/* How Pool Works Explanation */}
      <div className="pool-explanation">
        <h3>How the Credit Pool Works</h3>
        <div className="explanation-steps">
          <p>
            <strong>1. Adding Credits:</strong> Sellers call <code>addCreditToPool()</code> 
            to deposit verified carbon credits into the smart contract.
          </p>
          <p>
            <strong>2. Purchasing Credits:</strong> Buyers call <code>purchaseCredits()</code> 
            with ETH to buy credits from the pool.
          </p>
          <p>
            <strong>3. Automatic Distribution:</strong> The smart contract automatically 
            distributes payments to sellers proportionally when credits are purchased.
          </p>
          <p>
            <strong>4. Transparent Tracking:</strong> All transactions are recorded on the 
            blockchain and visible in the transaction history.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PoolInfo;