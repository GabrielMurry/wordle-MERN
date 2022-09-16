import axios from "axios";
const BASE_URL = "https://wordle-mern-api.onrender.com";
// "http://localhost:3500" for testing
// "https://wordle-mern-api.onrender.com" for deployment

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
