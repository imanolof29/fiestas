import { ApiError } from "@/error/api.error";
import { ApiErrorResponse } from "./api.types";

const handleApiErrorResponse = (response: ApiErrorResponse) => {
    return new ApiError(response.statusCode, response.message, response.error)
}

export const handleApiResponse = (status: number, data: any) => {
    if (!status.toString().startsWith("2")) {
        throw handleApiErrorResponse({
            statusCode: status,
            message: data.message
        })
    }
    return data
}