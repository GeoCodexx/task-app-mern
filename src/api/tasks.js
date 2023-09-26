import axios from "axios";
const API = "https://task-backend-mern.onrender.com/api/tasks";
//const API = "http://127.0.0.1:3000/api/tasks";
const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

//General
export const getAllTasks = async () => {
  try {
    const res = await instance.get("/list");
    //console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Vuelve a lanzar el error para manejarlo en otro lugar si es necesario
  }
};

//Por usuario
export const getTasks = async () => {
  const res = await instance.get("/listbyuser");
  return res;
};

export const getTask = async (id) => {
  const res = await instance.get(`/detail/${id}`);
  return res;
};

export const createTask = async (task) => {
  const res = await instance.post("/create", task);
  return res;
};

export const updateTask = async (id, task) => {
  const res = await instance.put(`/update/${id}`, task);
  return res;
};

export const deleteTask = async (id) => {
  const res = await instance.delete(`/delete/${id}`);
  return res;
};
