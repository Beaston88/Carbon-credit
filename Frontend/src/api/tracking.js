import axios from "axios";
import { createApiClient } from ".";

/**
 * Format a date object or string for API consumption
 * @param {Date|string} date - Date to format
 * @returns {string} - Formatted date string
 */
const formatDateParam = (date) => {
  if (!date) return null;

  // If it's already a string, return it
  if (typeof date === "string") return date;

  // If it's a Date object, convert to ISO string
  if (date instanceof Date) return date.toISOString();

  // Otherwise, try to create a Date object and convert
  return new Date(date).toISOString();
};

/**
 * Get daily impact data
 * @param {string} token - Authentication token
 * @param {Date|string} [date] - Optional specific date to get data for (defaults to today)
 * @returns {Promise<Object>} - Daily impact data
 */
export const getDailyImpact = async (token, date = new Date()) => {
  try {
    const apiClient = createApiClient(token);
    const formattedDate = formatDateParam(date);
    const queryParams = formattedDate ? `?date=${formattedDate}` : "";

    return await apiClient.get(`/tracking/daily-impact${queryParams}`);
  } catch (error) {
    console.error("Error fetching daily impact:", error);
    throw error;
  }
};

/**
 * Get transaction graph data for a specific date range
 * @param {string} token - Authentication token
 * @param {Object} options - Graph options
 * @param {Date|string} [options.startDate] - Start date for the graph
 * @param {Date|string} [options.endDate] - End date for the graph
 * @param {string} [options.groupBy] - How to group data (e.g., 'day', 'week', 'month')
 * @param {string} [options.type] - Type of transactions to include
 * @returns {Promise<Object>} - Transaction graph data
 */
export const getTransactionGraph = async (token, options = {}) => {
  try {
    const apiClient = createApiClient(token);

    // Format dates if they exist
    const startDate = formatDateParam(options.startDate);
    const endDate = formatDateParam(options.endDate);

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (options.groupBy) queryParams.append("groupBy", options.groupBy);
    if (options.type) queryParams.append("type", options.type);

    const queryString = queryParams.toString();
    const url = queryString
      ? `/tracking/transaction-graph?${queryString}`
      : "/tracking/transaction-graph";

    return await apiClient.get(url);
  } catch (error) {
    console.error("Error fetching transaction graph:", error);
    throw error;
  }
};

/**
 * Get carbon impact statistics
 * @param {string} token - Authentication token
 * @param {Object} options - Options for filtering statistics
 * @param {Date|string} [options.startDate] - Start date
 * @param {Date|string} [options.endDate] - End date
 * @returns {Promise<Object>} - Carbon impact statistics
 */
export const getCarbonImpactStats = async (token, options = {}) => {
  try {
    const apiClient = createApiClient(token);

    // Format dates if they exist
    const startDate = formatDateParam(options.startDate);
    const endDate = formatDateParam(options.endDate);

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);

    const queryString = queryParams.toString();
    const url = queryString
      ? `/tracking/carbon-impact?${queryString}`
      : "/tracking/carbon-impact";

    return await apiClient.get(url);
  } catch (error) {
    console.error("Error fetching carbon impact stats:", error);
    throw error;
  }
};

/**
 * Get historical tracking data
 * @param {string} token - Authentication token
 * @param {Object} options - Filter options
 * @param {number} [options.limit] - Number of records to return
 * @param {number} [options.offset] - Offset for pagination
 * @param {Date|string} [options.startDate] - Start date
 * @param {Date|string} [options.endDate] - End date
 * @returns {Promise<Array>} - Historical tracking data
 */
export const getTrackingHistory = async (token, options = {}) => {
  try {
    const apiClient = createApiClient(token);

    // Format dates if they exist
    const startDate = formatDateParam(options.startDate);
    const endDate = formatDateParam(options.endDate);

    // Build query parameters
    const queryParams = new URLSearchParams();

    if (startDate) queryParams.append("startDate", startDate);
    if (endDate) queryParams.append("endDate", endDate);
    if (options.limit) queryParams.append("limit", options.limit);
    if (options.offset) queryParams.append("offset", options.offset);

    const queryString = queryParams.toString();
    const url = queryString
      ? `/tracking/history?${queryString}`
      : "/tracking/history";

    return await apiClient.get(url);
  } catch (error) {
    console.error("Error fetching tracking history:", error);
    throw error;
  }
};
