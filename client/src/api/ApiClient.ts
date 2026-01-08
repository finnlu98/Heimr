import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_HEIMR_BACKEND_ENDPOINT ?? "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
