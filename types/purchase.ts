import { EventDto } from "./event"

export interface PurchaseDto {
    id: string
    buyerId: string
    event: EventDto
    purchaseDate: Date
    quantity: number
    qrCode: string
}