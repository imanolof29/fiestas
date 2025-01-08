import { UserDto } from "../user/user.dto"

export interface CommentDto {
    id: string
    user: UserDto
    content: string
    created: Date
}