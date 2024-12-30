import { createPlacePost, getPlacePosts } from "@/api/posts"
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

export const useCreatPlacePost = () => {
    const mutation = useMutation({
        mutationFn: ({ placeId, photo }: { placeId: string; photo: Blob }) =>
            createPlacePost(placeId, photo),
    });

    const handleSubmit = (placeId: string, photo: Blob) => {
        mutation.mutate({ placeId, photo });
    };

    return { handleSubmit, ...mutation };

}