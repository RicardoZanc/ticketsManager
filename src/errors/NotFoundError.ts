import { BaseError } from "./baseError";

export class NotFoundError extends BaseError {
    constructor(content: string){
        super()
        this.content = { NotFound: content }
    }
    content: object;
    status: number = 404
}