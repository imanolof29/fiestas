import { Position } from "../position/position.dto";

export interface EventDto {
    id: string;
    name: string;
    description: string;
    created: Date;
    price?: number;
    ticketLimit?: number;
    ticketsSold: number;
    categoryIds: string[];
    position: Position;
}