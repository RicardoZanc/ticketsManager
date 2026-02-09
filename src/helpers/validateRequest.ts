import { Request } from "express";
import { checkSchema, matchedData, Result, Schema, ValidationError, validationResult } from "express-validator";

export interface validationResult {
    result: Result<ValidationError>
    data: object
}

 const validateRequest = async (req: Request,  schema: Schema) =>{
    
    await checkSchema(schema, ['body']).run(req)
    const result = validationResult(req)
    const data = matchedData(req)
    const validation = {result, data}
    return validation
}

export default validateRequest;