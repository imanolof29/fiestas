import { Position } from "./position"

export interface PlaceDto {
    id: string
    name: string
    description: string
    position: Position;
    city: string
    street: string
    postcode: string
    housenumber: string
    website: string
    email: string
    facebook: string
    instagram: string
    phone: string
    osmId: string
}