import apiClient from "./apiClient";
import { buildQueryParams } from "../utils/analyticsUtils";

export const adminServices = {
  // Admin Member Management Flow
  registerMember: async (payload) => {
    const response = await apiClient.post(`/member/register`, payload);
    return response.data;
  },
  updateMember: async (id, payload) => {
    const response = await apiClient.patch(`/member/update/${id}`, payload);
    return response.data;
  },

  // Aggregations
  getAllMembers: async (queryString = "") => {
    const response = await apiClient.get(`/member/all${queryString}`);
    return response.data;
  },
  getMember: async (id) => {
    const response = await apiClient.get(`/member/${id}`);
    return response.data;
  },
  getMemberAnalytics: async (date) => {
    const response = await apiClient.get(`/member/analytics?date=${date}`);
    return response.data;
  },
  getAttendanceAnalytics: async (params = {}) => {
    const qs = buildQueryParams(params);
    const response = await apiClient.get(
      `/attendance/attendance-analytics${qs ? `?${qs}` : ""}`
    );
    return response.data;
  },
  getAttendanceList: async (params = {}) => {
    const qs = buildQueryParams(params);
    const response = await apiClient.get(
      `/attendance/fetch-attendance${qs ? `?${qs}` : ""}`
    );
    return response.data;
  },
  markAttendance: async ({ memberId, ...payload }) => {
    const response = await apiClient.post(`/attendance/mark/${memberId}`, payload);
    return response.data;
  },
  getAbsentMembers: async (date) => {
    const response = await apiClient.get(`/attendance/get-absent-members-for-a-worship?date=${date}&serviceDay=Sunday&page=1`);
    return response.data;
  },
};
