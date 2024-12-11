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
    const response = await axiosInstance.get<PaginationDto<CommentDto>>(`comments/find/${placeId}`, {
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
    const response = await axiosInstance.post<CommentDto>("comments/create", { placeId, content })
    return response.data
}