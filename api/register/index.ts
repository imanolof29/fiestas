
import { useMutation } from "@tanstack/react-query";
import axiosInstance from "..";

interface RegisterData {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
}

export const useRegisterUser = () => {
    return useMutation({
        mutationFn: async (data: RegisterData) => {
            try {
                const response = await axiosInstance.post('/auth/create', data);
                return response.data;
            } catch (e) {
                throw new Error("Algo fue mal al intentar registrar al usuario");
            }
        }
    });
};
