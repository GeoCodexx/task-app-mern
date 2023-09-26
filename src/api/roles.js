import axios from "axios";
const API = "https://task-backend-mern.onrender.com/api/roles";
//const API = "http://127.0.0.1:3000/api/roles";
const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

//General
export const getRoles = async () => {
  try {
    const res = await instance.get("/list");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Vuelve a lanzar el error para manejarlo en otro lugar si es necesario
  }
};

export const getRole = async (id) => {
  try {
    const res = await instance.get(`/detail/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createRole = async (user) => {
  try {
    const res = await instance.post("/create", user);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateRole = async (id, user) => {
  try {
    const res = await instance.put(`/update/${id}`, user);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteRole = async (id) => {
  try {
    const res = await instance.delete(`/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
