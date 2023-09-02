import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/users",
  withCredentials: true,
});

//General
export const getUsers= async () => {
  try {
    const res = await instance.get("/list");
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Vuelve a lanzar el error para manejarlo en otro lugar si es necesario
  }
};

export const getUser = async (id) => {
  try {
    const res = await instance.get(`/detail/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const createUser = async (user) => {
  try {
    const res = await instance.post("/create", user);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateUser = async (id, user) => {
  try {
    const res = await instance.put(`/update/${id}`, user);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await instance.delete(`/delete/${id}`);
    return res;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
