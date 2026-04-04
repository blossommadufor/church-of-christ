/**
 * Builds a URLSearchParams query string, skipping null/undefined/empty values.
 * @param {Record<string, any>} params
 * @returns {string}
 */
export const buildQueryParams = (params) => {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      query.append(key, value);
    }
  });
  return query.toString();
};

/**
 * Formats separate day/month/year numbers into a human-readable date string.
 * @param {number} day
 * @param {number} month  1-indexed
 * @param {number} year
 * @returns {string}  e.g. "15 Mar 2026"
 */
export const formatDate = (day, month, year) => {
  return new Date(year, month - 1, day).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

/**
 * Converts a 1-indexed month number to its abbreviated name.
 * @param {number} monthNumber
 * @returns {string}  e.g. "Mar"
 */
export const formatMonth = (monthNumber) => {
  return new Date(2000, monthNumber - 1, 1).toLocaleDateString("en-GB", {
    month: "short",
  });
};
