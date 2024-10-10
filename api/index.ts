import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.68.109:3000",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance