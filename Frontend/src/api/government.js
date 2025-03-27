import axios from "axios";
import { apiURL, createApiClient } from ".";

/**
 * Verify a marketplace listing (Government only)
 * @param {string} token - Authentication token
 * @param {string} listingId - ID of the listing to verify
 * @returns {Promise<Object>} - Verification result
 */
export const verifyListing = async (token, listingId) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post(`/government/verify/${listingId}`);
  } catch (error) {
    console.error(`Error verifying listing ${listingId}:`, error);
    throw error;
  }
};

/**
 * Get all verified marketplace listings
 * @param {string} token - Authentication token
 * @param {boolean} isVerified - Verified Parameter
 * @returns {Promise<Array>} - List of verified listings
 */
export const getVerifiedListings = async (token, isVerified) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get(
      `/government/verified-listings?verified=${isVerified}`
    );
  } catch (error) {
    console.error("Error fetching verified listings:", error);
    throw error;
  }
};

/**
 * Get marketplace listings filtered by verification status
 * @param {string} token - Authentication token
 * @param {boolean} verified - Verification status to filter by
 * @param {Object} additionalOptions - Additional filter options
 * @returns {Promise<Array>} - List of filtered listings
 */
export const getListingsByVerificationStatus = async (
  token,
  verified,
  additionalOptions = {}
) => {
  try {
    const apiClient = createApiClient(token);

    // Combine verified status with other options
    const options = {
      verified,
      ...additionalOptions,
    };

    // Build query string
    const queryParams = new URLSearchParams();
    Object.entries(options).forEach(([key, value]) => {
      queryParams.append(key, value);
    });

    return await apiClient.get(`/marketplace?${queryParams.toString()}`);
  } catch (error) {
    console.error(`Error fetching listings with verified=${verified}:`, error);
    throw error;
  }
};

/**
 * Get unverified listings pending review
 * @param {string} token - Authentication token
 * @returns {Promise<Array>} - List of unverified listings
 */
export const getUnverifiedListings = async (token) => {
  return await getListingsByVerificationStatus(token, false);
};

/**
 * Get government dashboard statistics
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} - Dashboard statistics
 */
export const getGovernmentStats = async (token) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.get("/government/stats");
  } catch (error) {
    console.error("Error fetching government statistics:", error);
    throw error;
  }
};

/**
 * Reject a marketplace listing verification (Government only)
 * @param {string} token - Authentication token
 * @param {string} listingId - ID of the listing to reject
 * @param {Object} reason - Rejection reason details
 * @returns {Promise<Object>} - Rejection result
 */
export const rejectListing = async (token, listingId, reason) => {
  try {
    const apiClient = createApiClient(token);
    return await apiClient.post(`/government/reject/${listingId}`, { reason });
  } catch (error) {
    console.error(`Error rejecting listing ${listingId}:`, error);
    throw error;
  }
};
