import { PlaceDto } from "@/dto/place/place.dto";
import axiosInstance from ".."
import { PaginationDto } from "@/types/pagination";

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