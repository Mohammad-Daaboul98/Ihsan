import axios from "axios";

const customFetch = axios.create({
  baseURL: `${import.meta.env.VITE_URL}/api/v1`,
});

export default customFetch;
