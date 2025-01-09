import { LoginDto } from "@/dto/auth/login.dto";
import { RegisterDto } from "@/dto/auth/register.dto";
import axiosInstance from "..";

export const signInWithEmail = async (dto: LoginDto) => {
    const response = await axiosInstance.post<LoginDto>('auth/login', dto)
    return response.data
}

export const register = async (dto: RegisterDto) => {
    const response = await axiosInstance.post<RegisterDto>('auth/register', dto)
    return response.data
}

export const signInWithGoogle = async (idToken: string) => {
    const response = await axiosInstance.post<string>('auth/google', { idToken })
    return response.data
}