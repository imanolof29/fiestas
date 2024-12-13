import { getPlaceDetail, getPlacesByLocation } from "@/api/places"
import { PaginationDto } from "@/types/pagination"
import { PlaceDto } from "@/types/place"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const usePlacesList = (latitude: number, longitude: number, radius: number) => {
    const [page, setPage] = useState<number>(0)
    const [limit, setLimit] = useState(10)

    const query = useQuery<PaginationDto<PlaceDto>>({
        queryKey: ["places", page, limit, latitude, longitude, radius],
        queryFn: () => getPlacesByLocation(page, limit, latitude, longitude, radius),
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

export const usePlaceDetail = (id: string) => useQuery({
    queryKey: ["place", id],
    queryFn: () => getPlaceDetail(id)
})

export const usePlaceList = (latitude: number, longitude: number, radius: number) => {
    const [limit, setLimit] = useState<number>(10)

    const query = useInfiniteQuery(
        ['places', latitude, longitude, radius, limit],
        ({ pageParam = 0 }) => getPlacesByLocation(pageParam, limit, latitude, longitude, radius),
        {
            getNextPageParam: (lastPage, pages) => {
                return lastPage.data.length === limit ? pages.length + 1 : undefined;
            },
            getPreviousPageParam: (firstPage, pages) => {
                return pages.length > 1 ? pages.length - 1 : undefined;
            }
        }
    );

    return {
        ...query,
        limit,
        setLimit
    };
};