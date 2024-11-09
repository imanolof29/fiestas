import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."
import { PaginationDto } from "@/types/pagination"
import { PlaceDto } from "@/types/place"

export const usePlaceList = () => {
    return useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<PaginationDto<PlaceDto>>("/places/find")
                return response.data
            } catch (e) {
                throw e
            }
        }
    })
}