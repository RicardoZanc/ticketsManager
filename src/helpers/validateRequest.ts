import { Request } from "express";
import { checkSchema, Schema, validationResult } from "express-validator";

 const validateRequest = async (req: Request,  schema: Schema) =>{
    await checkSchema(schema, ['body']).run(req)
    const result = validationResult(req)
    return result
}

export default validateRequest;