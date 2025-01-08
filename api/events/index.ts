import { useQuery } from "@tanstack/react-query"
import axiosInstance from ".."
import { PaginationDto } from "@/types/pagination"
import { EventDto } from "@/dto/event/event.dto"

export const useEventList = () => {
    return useQuery({
        queryKey: ['events'],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<PaginationDto<EventDto>>("/events/find")
                return response.data
            } catch (e) {
                throw new Error("Algo fue mal")
            }
        }
    })
}

export const useEventDetail = (id: string) => {
    return useQuery({
        queryKey: ['eventDetail', id],
        queryFn: async () => {
            try {
                const response = await axiosInstance.get<EventDto>(`/events/pick/${id}`)
                return response.data
            } catch (e) {
                throw new Error("Algo fue mal")
            }
        }
    })
}