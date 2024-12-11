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

export const getPlacesByLocation = async (
    page: number = 1,
    limit: number = 10,
    latitude: number,
    longitude: number,
    radius: number
): Promise<PaginationDto<PlaceDto>> => {
    const response = await axiosInstance.get<PaginationDto<PlaceDto>>('/places/nearby', {
        params: {
            lat: latitude,
            lon: longitude,
            radius,
            page,
            limit
        }
    })
    return response.data
}

export const getPlaceDetail = async (id: string) => {
    const response = await axiosInstance.get<PlaceDto>(`/places/pick/${id}`)
    return response.data
}