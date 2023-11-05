import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5050",
  timeout: 600000, // 10 min
  withCredentials: true,
});

export default axiosInstance;
