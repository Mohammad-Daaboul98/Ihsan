import axios from "axios";

const customFetch = axios.create({
  baseURL: `${import.meta.env.URL}/api/v1`,
});

export default customFetch;
