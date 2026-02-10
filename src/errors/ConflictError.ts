import { BaseError } from "./baseError";

export class ConflictError extends BaseError {
    constructor(content: string){
        super()
        this.content = { ConflictError: content }
    }
    content: object;
    status: number = 406
}