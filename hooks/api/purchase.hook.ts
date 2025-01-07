import { getPurchaseDetail, getPurchases } from "@/api/purchases"
import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { useState } from "react"

export const usePurchaseList = () => {
    const [limit, setLimit] = useState<number>(5)

    const query = useInfiniteQuery(
        ['purchases'],
        ({ pageParam = 0 }) => getPurchases(pageParam, limit),
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

}

export const usePurchaseDetail = (id: string) => useQuery({
    queryKey: ["purchase", id],
    queryFn: () => getPurchaseDetail(id)
})