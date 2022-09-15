import axios from "axios";
const BASE_URL = "https://wordle-api-usd8.onrender.com";
// "http://localhost:3500" for testing
// "https://wordle-api-usd8.onrender.com" for deployment

export default axios.create({
  baseURL: BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
