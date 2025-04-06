import React, { useEffect, useState } from 'react';
import { useCarbonCredit } from "../context/contextAPI";

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

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Carbon Credit Pool</h2>
          <p className="text-gray-600">Live updates: {formatTime(lastUpdateTime)}</p>
        </div>
        <button
          onClick={refreshPoolData}
          disabled={isLoading}
          className={`mt-3 md:mt-0 px-4 py-2 rounded-md flex items-center ${
            isLoading ? 'bg-gray-300' : 'bg-green-500 hover:bg-green-600'
          } text-white transition-colors`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Refreshing...
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Refresh Data
            </>
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Available Credits</h3>
          <p className="text-3xl font-bold text-gray-900 my-2">{totalPoolCredits}</p>
          <p className="text-sm text-gray-500">Last updated: {formatTime(lastRefresh)}</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Current Price</h3>
          <p className="text-3xl font-bold text-gray-900 my-2">{carbonCreditPrice} ETH</p>
          <p className="text-sm text-gray-500">Set by government contract</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <h3 className="text-lg font-medium text-gray-700">Active Sellers</h3>
          <p className="text-3xl font-bold text-gray-900 my-2">{contributionsCount}</p>
          <p className="text-sm text-gray-500">Verified carbon credit providers</p>
        </div>
      </div>

      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-xl font-semibold text-blue-800 mb-3">How the Credit Pool Works</h3>
        <div className="space-y-3">
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
              <span className="text-blue-800 font-bold">1</span>
            </div>
            <p className="text-gray-700">
              <strong className="text-blue-800">Adding Credits:</strong> Sellers call <code className="bg-blue-100 px-1 rounded">addCreditToPool()</code> 
              to deposit verified carbon credits into the smart contract.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
              <span className="text-blue-800 font-bold">2</span>
            </div>
            <p className="text-gray-700">
              <strong className="text-blue-800">Purchasing Credits:</strong> Buyers call <code className="bg-blue-100 px-1 rounded">purchaseCredits()</code> 
              with ETH to buy credits from the pool.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
              <span className="text-blue-800 font-bold">3</span>
            </div>
            <p className="text-gray-700">
              <strong className="text-blue-800">Automatic Distribution:</strong> The smart contract automatically 
              distributes payments to sellers proportionally when credits are purchased.
            </p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
              <span className="text-blue-800 font-bold">4</span>
            </div>
            <p className="text-gray-700">
              <strong className="text-blue-800">Transparent Tracking:</strong> All transactions are recorded on the 
              blockchain and visible in the transaction history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoolInfo;