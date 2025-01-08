export interface CreateEventDto {
    name: string
    description: string
    price?: number
    ticketLimit?: number
    latitude: number
    longitude: number
    categoryIds: string[]
}