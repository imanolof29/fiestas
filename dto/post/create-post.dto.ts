import { Photo } from "@/types/photo";

export interface CreatePostDto {
    placeId: string;
    image: Photo
}