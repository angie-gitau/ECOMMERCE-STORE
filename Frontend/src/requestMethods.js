import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/"
    : "https://eaf88190bad7.ngrok-free.app/api/v1/";  // <-- your current ngrok URL here

export const userRequest = axios.create({
  baseURL: BASE_URL,
});
