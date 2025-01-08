import { EventDto } from "../event/event.dto"

export interface PurchaseDto {
    id: string
    buyerId: string
    event: EventDto
    purchaseDate: Date
    quantity: number
    qrCode: string
}