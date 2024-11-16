import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."

export const useCommentList = (id: string) => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(``)
                return response.data
            } catch (e) {
                throw e
            }
        }
    })
}