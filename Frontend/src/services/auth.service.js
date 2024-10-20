import axios from "axios";

const API_URL = "/api/user";

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

export const getCurrentUser = async () => {
  const response = await axios.get(`${API_URL}/current-user`, {
    withCredentials: true,
  });
  return response.data.user;
};

export const logout = async () => {
  await axios.post(`${API_URL}/logout`, {}, { withCredentials: true });
};
