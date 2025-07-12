import axios from "axios"

const BASE_URL = "https://localhost:8800/api/v1/";


export const userRequest = axios.create({
    baseURL: BASE_URL
})