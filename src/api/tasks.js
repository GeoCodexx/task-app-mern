import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/tasks",
  withCredentials: true,
});

export const getAllTasks = async () => {
  const res = await instance.get("/list");
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
