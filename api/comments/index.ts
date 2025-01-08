import { PaginationDto } from "@/types/pagination"
import axiosInstance from ".."
import { CreateCommentDto } from "@/dto/comment/create-comment.dto"
import { CommentDto } from "@/dto/comment/comment.dto"

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
    { placeId, content }: CreateCommentDto
) => {
    const response = await axiosInstance.post<CommentDto>(`places/${placeId}/comments/create`, { content })
    return response.data
}