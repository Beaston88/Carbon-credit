import React, { useEffect, useState } from "react";
import { useCarbonCredit } from "../../context/contextAPI";
import { ethers } from "ethers";

const TransactionHistory = () => {
  const { 
    currentAccount, 
    isLoading, 
    getAllTransactions, 
    lastRefresh, 
    fetchAlchemyTransactions,
    contractTransactions,
    localTransactions,
    alchemyTransactions
  } = useCarbonCredit();
  
  const [transactions, setTransactions] = useState([]);

  // Format Ethereum address
  const formatAddress = (address) => {
    if (!address) return "System";
    const formatted = `${address.slice(0, 6)}...${address.slice(-4)}`;
    return address.toLowerCase() === currentAccount?.toLowerCase() ? 
      `You (${formatted})` : formatted;
  };

  // Format timestamp or block number
  const formatDate = (timestamp) => {
    if (!timestamp) return "Pending";
    return new Date(timestamp).toLocaleString([], {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Format value with decimals
  const formatValue = (value, decimals = 18) => {
    if (!value) return "0";
    const formatted = ethers.formatUnits(value, decimals);
    return parseFloat(formatted).toFixed(4);
  };

  // Categorize transaction type
  const getTransactionType = (tx) => {
    if (tx.type === 'purchase') return "Credit Added";
    if (tx.type === 'credit') return "Credit Purchased";
    if (tx.from === currentAccount?.toLowerCase()) return "Outgoing Transfer";
    return "Incoming Transfer";
  };

  // Get transaction icon
  const getTransactionIcon = (tx) => {
    switch (getTransactionType(tx)) {
      case "Credit Added":
        return "➕";
      case "Credit Purchased":
        return "🛒";
      case "Outgoing Transfer":
        return "↗️";
      case "Incoming Transfer":
        return "↙️";
      default:
        return "Ξ";
    }
  };

  // Get transaction status
  const getTransactionStatus = (tx) => {
    if (tx.completed === false) return "Pending";
    if (tx.completed === true) return "Completed";
    return tx.blockNum ? "Completed" : "Pending";
  };

  // Get transaction amount details
  const getTransactionAmount = (tx) => {
    if (tx.type === 'credit') return `${tx.amount} Credits Purchased`;
    if (tx.type === 'purchase') return `${tx.amount} Credits Added`;
    if (tx.value) return `${formatValue(tx.value)} ETH`;
    return "N/A";
  };

  // Get payment details for credit additions
  const getPaymentDetails = (tx) => {
    if (tx.type === 'credit') {
      return (
        <div className="space-y-1 text-sm">
          {tx.paymentAddress && (
            <div className="flex gap-1">
              <span className="text-gray-500">To:</span>
              <span>{formatAddress(tx.paymentAddress)}</span>
            </div>
          )}
          {tx.paymentDetails?.map((detail, i) => (
            <div key={i} className="flex gap-1">
              <span className="text-gray-500">Payment {i+1}:</span>
              <span>{formatAddress(detail.address)}</span>
              <span>({detail.amount} ETH)</span>
            </div>
          ))}
        </div>
      );
    }
    return null;
  };

  // Refresh transactions
  const handleRefresh = async () => {
    await fetchAlchemyTransactions(currentAccount);
  };

  // Combine and sort all transaction sources
  useEffect(() => {
    const combinedTransactions = getAllTransactions();
    setTransactions(combinedTransactions);
  }, [contractTransactions, localTransactions, alchemyTransactions, getAllTransactions]);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">Transaction History</h2>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleRefresh}
            disabled={isLoading}
            className="px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 disabled:opacity-50 transition-colors"
          >
            {isLoading ? "Refreshing..." : "Refresh"}
          </button>
          <span className="text-sm text-gray-500">
            Updated: {formatDate(lastRefresh)}
          </span>
        </div>
      </div>

      {isLoading && transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-3 text-gray-600">Loading transactions...</p>
        </div>
      ) : transactions.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <svg className="w-12 h-12 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p>No transactions found</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transactions.map((tx, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <span className="mr-2">{getTransactionIcon(tx)}</span>
                      <span>{getTransactionType(tx)}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="space-y-1">
                      {tx.type === 'credit' ? (
                        <>
                          <div>Added by: {formatAddress(tx.sender || tx.buyer)}</div>
                          {getPaymentDetails(tx)}
                        </>
                      ) : (
                        <>
                          <div>From: {formatAddress(tx.from)}</div>
                          <div>To: {formatAddress(tx.to)}</div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getTransactionAmount(tx)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {formatDate(tx.timestamp || tx.blockNum)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      getTransactionStatus(tx) === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {getTransactionStatus(tx)}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {tx.hash && (
                      <a 
                        href={`https://etherscan.io/tx/${tx.hash}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 transition-colors"
                      >
                        View ↗
                      </a>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;