import { CommentDto } from "@/dto/comment/comment.dto"
import { CreateCommentDto } from "@/dto/comment/create-comment.dto"
import { getPlaceComments, postComment } from "@/services/api/place/comment/comment.service"
import { PaginationDto } from "@/types/pagination"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const useCommentList = (placeId: string) => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const query = useQuery<PaginationDto<CommentDto>>({
        queryKey: ["comments", page, limit, placeId],
        queryFn: () => getPlaceComments({ page, limit, placeId }),
        refetchOnWindowFocus: true,
        refetchOnMount: true
    })

    return {
        ...query,
        page,
        limit,
        setPage,
        setLimit
    }

}

export const usePostComment = () => {
    const mutation = useMutation({
        mutationFn: (post: CreateCommentDto) => postComment(post)
    })

    const handleSubmit = (post: CreateCommentDto) => {
        mutation.mutate(post)
    }

    return { handleSubmit, ...mutation }

}