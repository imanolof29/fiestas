import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."
import { PlaceDto } from "@/types/place"

export const usePlaceList = (latitude: number, longitude: number, radius: number) => {
    return useQuery<PlaceDto[]>(
        ['places', latitude, longitude, radius],
        async () => {
            const response = await axiosInstance.get<PlaceDto[]>('/places/nearby', {
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