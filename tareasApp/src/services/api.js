import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.100:3000/api", // cambia por tu IP
});

export default api;