import { LoginDto } from "@/dto/auth/login.dto";
import { RegisterDto } from "@/dto/auth/register.dto";
import axiosInstance from "..";


export const login = async (dto: LoginDto) => {
    const response = await axiosInstance.post<LoginDto>('auth/login', dto)
    return response.data
}

export const register = async (dto: RegisterDto) => {
    const response = await axiosInstance.post<RegisterDto>('auth/register', dto)
    return response.data
}