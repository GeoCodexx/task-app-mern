import axios from "axios";

const API = "http://127.0.0.1:3000/api";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const registerRequest = async (user) => {
  const response = await axiosInstance.post("/auth/register", user);
  return response;
};

export const loginRequest = async (credentials) => {
  const response = await axiosInstance.post("/auth/login", credentials);
  return response;
};

export const logoutRequest = () => {
  axiosInstance.get("/auth/logout");
};

//export const verifyTokenRequest = async () => axios.get(`/auth/verify`);

export const profileRequest = async () => {
  const response = await axiosInstance.get("/auth/profile");
  return response;
};

export const verifyState = async (token) => {
  const response = await axios.get("http://127.0.0.1:3000/api/auth/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
