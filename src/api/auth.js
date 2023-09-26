import axios from "axios";

const API = "https://task-backend-mern.onrender.com/api/auth";
//const API = "http://127.0.0.1:3000/api/auth";

const axiosInstance = axios.create({
  baseURL: API,
  withCredentials: true,
});

export const registerRequest = async (user) => {
  const response = await axiosInstance.post("/register", user);
  return response;
};

export const loginRequest = async (credentials) => {
  const response = await axiosInstance.post("/login", credentials);
  return response;
};

export const logoutRequest = () => {
  axiosInstance.get("/logout");
};

//export const verifyTokenRequest = async () => axios.get(`/verify`);

export const profileRequest = async () => {
  const response = await axiosInstance.get("/profile");
  return response;
};

export const verifyState = async (token) => {
  const response = await axiosInstance.get("/verify", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
};
