import axios from "axios";
const BASE_URL = "https://wordle-mern-backend.adaptable.app/";
// "http://localhost:3500" for testing
// "http://192.168.50.29:3500" for testing on network (other than local machine) - ex: mobile
// "https://wordle-mern-api.onrender.com" for deployment
// "https://api.render.com/deploy/srv-ccictsha6gdmtlafkbm0?key=8Hd1kY_B9Qg" deploy hook??
// "https://wordle-mern-backend.adaptable.app/" works!! deploys and runs backend server!

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
