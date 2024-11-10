import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.68.107:3000",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default axiosInstance