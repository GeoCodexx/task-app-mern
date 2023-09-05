import axios from "axios";
const instance = axios.create({
  baseURL: "http://127.0.0.1:3000/api/charts",
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
