import axios from "axios";
const BASE_URL = "https://wordle-mern-api.onrender.com";
// "http://localhost:3500" for testing
// "http://192.168.50.29:3500" for testing on network (other than local machine) - ex: mobile
// "https://wordle-mern-api.onrender.com" for deployment

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
