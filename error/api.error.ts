export class ApiError extends Error {
    public statusCode: number
    public backendMessage?: string

    constructor(statusCode: number, message: string, backendMessage?: string) {
        super(message)
        this.statusCode = statusCode
        this.backendMessage = backendMessage
        Object.setPrototypeOf(this, ApiError.prototype)
    }

}