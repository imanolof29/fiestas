import { PlaceDto } from "@/dto/place/place.dto";
import { PaginationDto } from "@/types/pagination";
import axiosInstance from "..";

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

export const getPlaceDetail = async (id: string): Promise<PlaceDto> => {
    const response = await axiosInstance.get<PlaceDto>(`place/pick/${id}`)
    return response.data
}