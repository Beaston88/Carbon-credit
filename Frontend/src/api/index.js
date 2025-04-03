export const apiURL = "http://localhost:3300";
import axios from "axios";

/**
 * Creates an axios instance with predefined configuration for government API endpoints
 * @param {string} token - Authentication token
 * @returns {Object} - Configured axios instance
 */
export const createApiClient = (token) => {
  const instance = axios.create({
    baseURL: apiURL,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    timeout: 10000, // 10 second timeout
  });

  // Add response interceptor for common error handling
  instance.interceptors.response.use(
    (response) => response.data,
    (error) => {
      const statusCode = error.response?.status;
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Unknown error occurred";

      console.error(`Government API Error (${statusCode}): ${errorMessage}`);

      // You can handle specific error codes here if needed
      if (statusCode === 403) {
        console.error(
          "Permission denied. User might not have government role."
        );
      }

      throw error;
    }
  );

  return instance;
};
