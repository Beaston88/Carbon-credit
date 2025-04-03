import { createApiClient } from ".";

/**
 * Create a new transaction
 * @param {string} token - Authentication token
 * @param {Object} creditsReq - Transaction request details
 * @returns {Promise<Object>} - Transaction result
 */
export const createTransaction = async (token, creditsReq) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post("/transaction", {
      creditsRequired: creditsReq,
    });
  } catch (error) {
    console.error(`Error creating transaction:`, error);
    throw error;
  }
};

/**
 * Get all transactions for a user (either sent or received)
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - Retrieved transactions
 */
export const getUserTransactions = async (token) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get("/transaction");
  } catch (error) {
    console.error(`Error retrieving transactions:`, error);
    throw error;
  }
};

/**
 * Get a specific transaction by ID
 * @param {string} token - Authentication token
 * @param {string} transactionId - ID of the transaction to retrieve
 * @returns {Promise<Object>} - Retrieved transaction
 */
export const getTransactionById = async (token, transactionId) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get(`/transaction/${transactionId}`);
  } catch (error) {
    console.error(`Error retrieving transaction ${transactionId}:`, error);
    throw error;
  }
};

/**
 * Update the status of a transaction
 * @param {string} token - Authentication token
 * @param {string} transactionId - ID of the transaction to update
 * @param {string} status - New transaction status (e.g., SUCCESS, FAILED)
 * @returns {Promise<Object>} - Updated transaction
 */
export const updateTransactionStatus = async (token, transactionId, status) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.put(`/transaction/${transactionId}`, { status });
  } catch (error) {
    console.error(`Error updating transaction ${transactionId}:`, error);
    throw error;
  }
};
