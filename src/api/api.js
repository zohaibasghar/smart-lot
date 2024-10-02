import axios from "axios";
import { toast } from "react-toastify";

const baseURL = process.env.REACT_APP_API_URL;

const apiInstance = axios.create({ baseURL });

apiInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  config.headers["Authorization"] = `bearer ${token}`;
  return config;
});

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const errorMessage =
      error.response.data?.message || "Something went wrong!";
    toast.error(errorMessage);
    return Promise.reject(errorMessage);
  }
);

export { apiInstance };
