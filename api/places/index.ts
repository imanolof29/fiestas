import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."
import { PaginationDto } from "@/types/pagination"
import { PlaceDto } from "@/types/place"

export const usePlaceList = (lat: number, lon: number, radius: number) => {
    return useQuery({
        queryKey: ['places'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<PaginationDto<PlaceDto>>("/nearby", {
                    params: {
                        lat,
                        lon,
                        radius
                    }
                })
                return response.data
            } catch (e) {
                throw e
            }
        }
    })
}