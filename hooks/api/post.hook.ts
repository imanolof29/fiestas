import { CreatePostDto } from "@/dto/post/create-post.dto"
import { createPlacePost } from "@/services/api/place/post/post.service"
import { PaginationDto } from "@/types/pagination"
import { PostDto } from "@/types/post"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const usePostList = (placeId: string) => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState<number>(10)

    const query = useQuery<PaginationDto<PostDto>>({
        queryKey: ["posts", page, limit, placeId],
        queryFn: () => getPlacePosts(placeId),
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

export const useCreatePlacePost = () => {
    const mutation = useMutation({
        mutationFn: (dto: CreatePostDto) =>
            createPlacePost(dto),
    });

    const handleSubmit = (dto: CreatePostDto) => {
        mutation.mutate(dto);
    };

    return { handleSubmit, ...mutation };

}

function getPlacePosts(placeId: string): PaginationDto<PostDto> | Promise<PaginationDto<PostDto>> {
    throw new Error("Function not implemented.")
}
