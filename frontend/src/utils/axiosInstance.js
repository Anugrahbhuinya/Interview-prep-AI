import axios from 'axios';
import { BASE_URL } from './apiPaths';

const axiosInstance = axios.create({
  baseURL: BASE_URL, // http://localhost:5000
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  }
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        window.location.href = "/";
      } else if (error.response.status === 500) {
        console.error("Server Error");
      }
    } else if (error.code === "ECONNABORTED") {
      console.error("Request Timeout");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;