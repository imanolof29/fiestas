import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."
import { PlaceDto } from "@/types/place"
import { PaginationDto } from "@/types/pagination";

export const usePlaceList = (latitude: number, longitude: number, radius: number) => {
    return useQuery<PaginationDto<PlaceDto>>(
        ['places', latitude, longitude, radius],
        async () => {
            const response = await axiosInstance.get<PaginationDto<PlaceDto>>('/places/nearby', {
                params: {
                    lat: latitude,
                    lon: longitude,
                    radius
                }
            })
            return response.data
        },
        {
            enabled: !!latitude && !!longitude,
        }
    );
};