import axiosInstance from "@/api"
import { CreatePostDto } from "@/dto/post/create-post.dto"
import { PostDto } from "@/dto/post/post.dto"
import { PaginationDto } from "@/types/pagination"
import { Platform } from "react-native"

export const getPlacePost = async (placeId: string) => {
    const response = await axiosInstance.get<PaginationDto<PostDto>>(`/places/${placeId}/posts/find`)
    return response.data
}

export const createPlacePost = async (dto: CreatePostDto) => {
    const formData = new FormData()
    formData.append('file', {
        uri: Platform.OS === 'ios' ? dto.image.uri.replace('file://', '') : dto.image.uri,
        name: 'photo.jpg',
        type: dto.image.type,
    } as any);
    const response = await axiosInstance.post(`/places/${dto.placeId}/posts/create`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}