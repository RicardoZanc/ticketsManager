import { Schema } from "express-validator";
import { isValidCNPJ } from "../../utils/commonValidators";


const createTenant: Schema = {
    name: {
        isString: {
            errorMessage: 'Tenant name must be a string'
        },
        notEmpty: {
            errorMessage: 'Tenant name is required'
        }
    },
    cnpj: {
        notEmpty: {
            errorMessage: 'Tenant CNPJ is required'
        },
        customSanitizer: {
            options: value => value ? value.replace(/\D/g, '') : null
        },
        custom: {
            options: value => isValidCNPJ(value),
            errorMessage: 'Invalid CNPJ'
        }
    },
    "firstUser.name": {
        isString: {
            errorMessage: "User name must be an string"
        },
        notEmpty: {
            errorMessage: "User name is required"
        },
        isLength: {
            options: {
                min: 2,
                max: 20
            },
            errorMessage: "User name lenght must be between 2 and 20"
        }
    },
    "firstUser.email": {
        isEmail: {
            errorMessage: "User email must be an email"
        },
        notEmpty: {
            errorMessage: "User email is required"
        }
    },
    "firstUser.password": {
        isString: true,
        isLength: {
            options: {
                min: 8
            },
            errorMessage: "Password must have at least 8 characters"
        },
        notEmpty: {
            errorMessage: "User password is required"
        }
    },
    "firstUser.confirmPassword": {
        isString: {
            errorMessage: "User password must be a string"
        },
        notEmpty: {
            errorMessage: "User password is required"
        },
        custom: {
            options: (value, {req})=> value === req.body.firstUser.password,
            errorMessage: "Passwords do not match"
        }
    }
}

export const tenantSchema = {
    createTenant
}