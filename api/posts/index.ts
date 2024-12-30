import { PaginationDto } from "@/types/pagination"
import axiosInstance from ".."
import { PostDto } from "@/types/post"

export const getPlacePosts = async (
    placeId: string
) => {
    const response = await axiosInstance.get<PaginationDto<PostDto>>(`/places/${placeId}/posts/find`)
    return response.data
}

export const createPlacePost = async (placeId: string, image: Blob) => {
    const formdata = new FormData()
    const response = await axiosInstance.post(`/places/${placeId}/posts/create`, formdata)
    return response.data
}