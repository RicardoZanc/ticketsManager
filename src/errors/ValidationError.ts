import { BaseError } from "./baseError";

export class ValidationError extends BaseError {

    constructor(content: Array<formattedError>){
        super()
        this.content = content
    }

    status: number = 400
    content: object;
}

export interface formattedError {
    path: string,
    message: string
}
