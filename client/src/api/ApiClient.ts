import axios from "axios";
import { get } from "http";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_HEIMR_BACKEND_ENDPOINT ?? "",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.response.use(
  (response) => {
    console.log("API Response:", response.data);
    if (response.data?.user?.avatarUrl && !response.data.user.avatarUrl.startsWith("http")) {
      response.data.user.avatarUrl = getFullImageUrl(response.data.user.avatarUrl);
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

function getFullImageUrl(imgKey: string): string {
  if (imgKey.startsWith("http")) {
    return imgKey;
  }
  return `${process.env.REACT_APP_HEIMR_BACKEND ?? ""}${imgKey}`;
}

export default apiClient;
