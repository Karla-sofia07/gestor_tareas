import axios from "axios";

const api = axios.create({
  baseURL: "http://TU_IP:3000/api", // tu backend
  timeout: 5000,
});

export default api;
