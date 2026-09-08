import axios, { create } from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
  withCredentials: true,
});

export const getDocs = async () => {
  try {
    const res = await api.get("/api/ai/getdocs");
    return res.data;
  } catch (err: any) {
    console.log(err.response?.data?.message || err.message || "Failed to retrive the documents! Try again");
    throw err;
  }
};

export const getDocsById = async ({id} : {id : string}) => {
  try {
    const res = await api.get(`/api/ai/getdocs/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(err.response?.data?.message || err.message || "Failed to retrive the documents! Try again");
    throw err;
  }
};


export default {getDocs , getDocsById}