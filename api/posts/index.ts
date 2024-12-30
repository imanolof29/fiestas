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
    const formData = new FormData();
    formData.append('file', image);
    console.log(image)
    const response = await axiosInstance.post(`/places/${placeId}/posts/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}