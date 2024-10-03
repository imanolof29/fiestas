import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."

export const useEventList = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get("/events/find")
                return response.data
            } catch (e) {
                throw new Error("Algo fue mal")
            }
        }
    })
}

export const useEventDetail = (id: string) => {
    console.log(id)
    return useQuery({
        queryKey: ['eventDetail', id],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get(`/events/pick/${id}`)
                return response.data
            } catch (e) {
                throw new Error("Algo fue mal")
            }
        }
    })
}