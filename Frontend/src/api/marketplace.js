import { createApiClient } from ".";

/**
 * Create a new marketplace item
 * @param {string} token - Authentication token
 * @param {Object} itemData - Item data (name, description, image, credits, price)
 * @returns {Promise<Object>} - Created item data
 */
export const createMarketplaceItem = async (token, itemData) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post("/marketplace", itemData);
  } catch (error) {
    console.error("Error creating marketplace item:", error);
    throw error;
  }
};

/**
 * Get all marketplace items with optional verification filter
 * @param {string} token - Authentication token
 * @param {boolean} [verified] - Filter by verification status (optional)
 * @returns {Promise<Array>} - List of marketplace items
 */
export const getMarketplaceItems = async (token, verified = null) => {
  try {
    const apiClient = createApiClient(token);

    // Build query parameters
    const queryParams = new URLSearchParams();
    if (verified !== null) {
      queryParams.append("verified", verified);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `/marketplace?${queryString}` : "/marketplace";

    return await apiClient.get(url);
  } catch (error) {
    console.error("Error fetching marketplace items:", error);
    throw error;
  }
};

/**
 * Get a specific marketplace item by ID
 * @param {string} token - Authentication token
 * @param {string} itemId - Item ID
 * @returns {Promise<Object>} - Item data
 */
export const getMarketplaceItem = async (token, itemId) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get(`/marketplace/${itemId}`);
  } catch (error) {
    console.error(`Error fetching marketplace item ${itemId}:`, error);
    throw error;
  }
};

/**
 * Update a marketplace item
 * @param {string} token - Authentication token
 * @param {string} itemId - Item ID to update
 * @param {Object} itemData - Updated item data
 * @returns {Promise<Object>} - Updated item data
 */
export const updateMarketplaceItem = async (token, itemId, itemData) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.put(`/marketplace/${itemId}`, itemData);
  } catch (error) {
    console.error(`Error updating marketplace item ${itemId}:`, error);
    throw error;
  }
};

/**
 * Get marketplace items belonging to the current user
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} - List of user's marketplace items
 */
export const getUserMarketplaceItems = async (token) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get(`/marketplace/me`);
  } catch (error) {
    console.error("Error fetching user's marketplace items:", error);
    throw error;
  }
};

/**
 * Delete a marketplace item
 * @param {string} token - Authentication token
 * @param {string} itemId - ID of the item to delete
 * @returns {Promise<Object>} - Deletion response
 */
export const deleteMarketplaceItem = async (token, itemId) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.delete(`/marketplace/${itemId}`);
  } catch (error) {
    console.error(`Error deleting marketplace item ${itemId}:`, error);
    throw error;
  }
};

/**
 * Purchase a marketplace item
 * @param {string} token - Authentication token
 * @param {string} itemId - ID of the item to purchase
 * @param {Object} purchaseData - Purchase details
 * @returns {Promise<Object>} - Purchase confirmation
 */
export const purchaseMarketplaceItem = async (
  token,
  itemId,
  purchaseData = {}
) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post(
      `/marketplace/${itemId}/purchase`,
      purchaseData
    );
  } catch (error) {
    console.error(`Error purchasing marketplace item ${itemId}:`, error);
    throw error;
  }
};
