import { CommentDto } from "@/dto/comment/comment.dto"
import { CreateCommentDto } from "@/dto/comment/create-comment.dto"
import { PaginationDto } from "@/types/pagination"
import axiosInstance from "../.."

export const getPlaceComments = async (properties: {
    page: number,
    limit: number,
    placeId: string
}) => {
    const response = await axiosInstance.get<PaginationDto<CommentDto>>(`places/${properties.placeId}/comments/find`, {
        params: {
            page: properties.page,
            limit: properties.limit
        }
    })
    return response.data
}

export const postComment = async ({ placeId, content }: CreateCommentDto) => {
    const response = await axiosInstance.post<CommentDto>(`places/${placeId}/comments/create`, { content })
    return response.data
}