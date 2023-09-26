import axios from "axios";
const API = "https://task-backend-mern.vercel.app/api/charts";
//const API = "http://127.0.0.1:3000/api/charts";
const instance = axios.create({
  baseURL: API,
  withCredentials: true,
});

//getData for InforCards
export const getDataInfoCards = async () => {
  try {
    const res = await instance.get("/infocards");
    return res.data;
  } catch (error) {
    console.log(error);
    throw error; // Vuelve a lanzar el error para manejarlo en otro lugar si es necesario
  }
};
