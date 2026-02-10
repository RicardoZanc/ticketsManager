import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { BaseError } from "../errors/baseError";

const normalizeError = (error: Error) => {
    return error.message
}

export const errorHandler = (error: BaseError, req: Request, res: Response, next: NextFunction)=>{
    if(!(error instanceof BaseError)){
        const response = normalizeError(error)
        res.status(500).send(response)
    }
    
    res.status(error.status).send(error.content)
}