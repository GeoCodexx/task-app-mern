import axios from "axios";

const API = "http://localhost:3000/api";

export const registerRequest = async (user) => {
  const response = await axios.post(`${API}/auth/register`, user);
  return response;
};

export const loginRequest = async (credentials) => {
  const response = await axios.post(`${API}/auth/login`, credentials);
  return response;
};

export const logoutRequest = async () => {
  const response = await axios.get(`${API}/auth/logout`);
  return response;
};