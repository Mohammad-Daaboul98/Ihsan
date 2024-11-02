import axios from "axios";

const customFetch = axios.create({
  baseURL: `/api/v1`,
  // baseURL: `${import.meta.env.VITE_URL}/api/v1`,
});

export default customFetch;
