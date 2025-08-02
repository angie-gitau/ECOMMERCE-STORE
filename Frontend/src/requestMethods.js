import axios from "axios";

// Dynamically pick base URL based on current frontend origin
const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/"
    : "https://800829b4d0dd.ngrok-free.app/api/v1/";

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
