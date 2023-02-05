import axios from "axios";
const BASE_URL = "http://localhost:3500";
// "http://localhost:3500" for testing
// "http://192.168.50.29:3500" for testing on network (other than local machine) - ex: mobile
// "https://wordle-mern-api.onrender.com" for deployment
// "https://api.render.com/deploy/srv-ccictsha6gdmtlafkbm0?key=8Hd1kY_B9Qg" deploy hook

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
