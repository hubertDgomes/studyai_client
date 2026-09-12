import axios, { create } from "axios";

const api = axios.create({
  baseURL: "https://studyai-backend-fsq9.onrender.com",
  withCredentials: true,
});

export const getDocs = async () => {
  try {
    const res = await api.get("/api/ai/getdocs");
    return res.data;
  } catch (err: any) {
    console.log(
      err.response?.data?.message ||
        err.message ||
        "Failed to retrive the documents! Try again",
    );
    throw err;
  }
};

export const getDocsById = async ({ id }: { id: string }) => {
  try {
    const res = await api.get(`/api/ai/getdocs/${id}`);
    return res.data;
  } catch (err: any) {
    console.log(
      err.response?.data?.message ||
        err.message ||
        "Failed to retrive the documents! Try again",
    );
    throw err;
  }
};

export const uploadDocs = async (file: File) => {
  try {
    const formData = new FormData();
    formData.append("extractedText", file);

    const res = await api.post("/api/ai/docsupload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (err: any) {
    console.log(
      err.response?.data?.message ||
        err.message ||
        "Failed to upload the documetns",
    );
    throw err;
  }
};

export const getTheAnwer = async ({
  question,
  id,
}: {
  question: string;
  id: string;
}) => {
  try {
    const res = await api.post(`/api/ai/questions/${id}` , {question});
    return res.data;
  } catch (err: any) {
    console.log(
      err.response?.data?.message ||
        err.message ||
        "Failed to answer the question. Please try again",
    );
    throw err;
  }
};

export default { getDocs, getDocsById, uploadDocs, getTheAnwer};
