import { PaginationDto } from "@/types/pagination"
import axiosInstance from ".."
import { CommentDto } from "@/types/comment"

export interface PostCommentDto {
    placeId: string
    content: string
}

export const getPlaceComments = async (
    page: number = 0,
    limit: number = 10,
    placeId: string
) => {
    const response = await axiosInstance.get<PaginationDto<CommentDto>>(`places/${placeId}/comments/find`, {
        params: {
            page,
            limit
        }
    })
    return response.data
}

export const postComment = async (
    { placeId, content }: PostCommentDto
) => {
    const response = await axiosInstance.post<CommentDto>(`places/${placeId}/comments/create`, { content })
    return response.data
}