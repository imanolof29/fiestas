import axiosInstance from "@/api"
import { EventDto } from "@/dto/event/event.dto"
import { PaginationDto } from "@/types/pagination"

export const getEvents = async () => {
    const response = await axiosInstance.get<PaginationDto<EventDto>>("/events/find")
    return response.data
}

export const getEventDetail = async (id: string) => {
    const response = await axiosInstance.get<EventDto>(`/events/pick/${id}`)
    return response.data
}