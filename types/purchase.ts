import { EventDto } from "@/dto/event/event.dto"

export interface PurchaseDto {
    id: string
    buyerId: string
    event: EventDto
    purchaseDate: Date
    quantity: number
    qrCode: string
}