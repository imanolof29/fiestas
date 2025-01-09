import { handleApiResponse } from "@/utils/api/api.util";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://192.168.68.101:3000",
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        throw handleApiResponse(error.status, error)
    }
)

export default axiosInstance