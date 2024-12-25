import { PaginationDto } from "@/types/pagination";
import axiosInstance from "..";
import { PurchaseDto } from "@/types/purchase";

export const getPurchases = async (
    page: number = 1,
    limit: number = 10
): Promise<PaginationDto<PurchaseDto>> => {
    const response = await axiosInstance.get<PaginationDto<PurchaseDto>>('purchases/find', {
        params: {
            limit,
            page
        }
    })
    return response.data
}

export const getPurchaseDetail = async (id: string) => {
    const response = await axiosInstance.get<PurchaseDto>(`/purchases/pick/${id}`)
    return response.data
}