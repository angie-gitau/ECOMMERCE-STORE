import axios from "axios";

const BASE_URL =
  window.location.hostname === "localhost"
    ? "http://localhost:8000/api/v1/"
    : "https://55bdc1b495e7.ngrok-free.app/api/v1/";

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, //<-- this enables sending cookies (JWT)
});
