import { createApiClient } from ".";

/**
 * Get user details
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - User data
 */
export const getUser = async (token) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get("/user");
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

/**
 * Create new user
 * @param {string} token - Authentication token
 * @param {Object} userData - User data object
 * @returns {Promise<Object>} - Created user data
 */
export const createUser = async (token, userData) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post("/user", userData);
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

/**
 * Update existing user
 * @param {string} token - Authentication token
 * @param {string} userId - User ID to update
 * @param {Object} userData - Updated user data
 * @returns {Promise<Object>} - Updated user data
 */
export const updateUser = async (token, userId, userData) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.put(`/user/${userId}`, userData);
  } catch (error) {
    console.error(`Error updating user ${userId}:`, error);
    throw error;
  }
};

/**
 * Delete user
 * @param {string} token - Authentication token
 * @param {string} userId - User ID to delete
 * @returns {Promise<Object>} - Deletion confirmation
 */
export const deleteUser = async (token, userId) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.delete(`/user/${userId}`);
  } catch (error) {
    console.error(`Error deleting user ${userId}:`, error);
    throw error;
  }
};

/**
 * Get all users (admin only)
 * @param {string} token - Authentication token
 * @param {Object} filters - Optional filter parameters
 * @returns {Promise<Array>} - List of users
 */
export const getAllUsers = async (token, filters = {}) => {
  try {
    const apiClient = createApiClient(token);
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `/users?${queryParams}` : "/users";
    return await apiClient.get(url);
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};
