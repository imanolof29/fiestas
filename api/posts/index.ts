import { PaginationDto } from "@/types/pagination"
import axiosInstance from ".."
import { PostDto } from "@/types/post"
import { Platform } from "react-native"
import { Photo } from "@/types/photo"

export const getPlacePosts = async (
    placeId: string
) => {
    const response = await axiosInstance.get<PaginationDto<PostDto>>(`/places/${placeId}/posts/find`)
    return response.data
}

export const createPlacePost = async (placeId: string, image: Photo) => {
    const formData = new FormData();
    formData.append('file', {
        uri: Platform.OS === 'ios' ? image.uri.replace('file://', '') : image.uri,
        name: 'photo.jpg',
        type: image.type,
    } as any);
    const response = await axiosInstance.post(`/places/${placeId}/posts/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}