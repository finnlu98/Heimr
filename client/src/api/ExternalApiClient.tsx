import axios from "axios";

const externalApiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

externalApiClient.interceptors.request.use(
  async (config) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return config;
  },
  (error) => Promise.reject(error),
);

export default externalApiClient;
