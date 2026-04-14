import moment from "moment";

/**
 * Formats a given date/time string into a human-readable date.
 * Defaults to "MMM DD, YYYY" (e.g., Apr 12, 2026).
 * 
 * @param {string|Date|number} date - The date to format.
 * @param {string} [formatStr="MMM DD, YYYY"] - The target format.
 * @returns {string}
 */
export const formatDate = (date, formatStr = "MMM DD, YYYY") => {
  if (!date) return "—";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format(formatStr) : "Invalid Date";
};

/**
 * Formats a given date/time string into a human-readable date and time.
 * Defaults to "MMM DD, YYYY • hh:mm A" (e.g., Apr 12, 2026 • 09:20 AM).
 * 
 * @param {string|Date|number} date - The date to format.
 * @param {string} [formatStr="MMM DD, YYYY • hh:mm A"] - The target format.
 * @returns {string}
 */
export const formatDateTime = (date, formatStr = "MMM DD, YYYY • hh:mm A") => {
  if (!date) return "—";
  const parsed = moment(date);
  return parsed.isValid() ? parsed.format(formatStr) : "Invalid Date";
};
