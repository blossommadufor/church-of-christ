import apiClient from "./apiClient";

export const memberServices = {
    // Member Login Flow
    requestOtp: async (phone) => {
        const response = await apiClient.get(`/member/request-otp?phone=${encodeURIComponent(phone)}`);
        return response.data;
    },
    login: async (otp) => {
        const response = await apiClient.post(`/member/login`, { otp });
        return response.data;
    }
};
