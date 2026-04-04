import apiClient from "./apiClient";

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
  getAnalytics: async (date) => {
    const response = await apiClient.get(`/member/analytics?date=${date}`);
    return response.data;
  },
};
