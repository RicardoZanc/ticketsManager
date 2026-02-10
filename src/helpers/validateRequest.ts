import { Request } from "express";
import { checkSchema, matchedData,Schema, validationResult } from "express-validator";
import { formattedError, ValidationError } from "../errors/ValidationError";


 const validateRequest = async <T extends object>(req: Request<{}, {}, T>,  schema: Schema) =>{
    
    await checkSchema(schema, ['body']).run(req)
    const result = validationResult(req)

   if (!result.isEmpty()) {
        const mapped: Array<formattedError> = result.formatWith((e: any) =>{
            return {path: e.path, message: e.msg}
        }).array()

        throw new ValidationError(mapped)
    }

    const data: T = matchedData(req)
    return data
}

export default validateRequest;