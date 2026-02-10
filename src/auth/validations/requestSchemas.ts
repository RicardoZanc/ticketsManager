import { Schema } from "express-validator";
import { type_user } from "../../lib/prisma/generated/enums";

const signup: Schema = {
    tenant_id: {
        isString: {
            errorMessage: "Tenant Id must be an UUID"
        },
        notEmpty: {
            errorMessage: "Tenant Id is required"
        }
    },
    name: {
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
    email: {
        isEmail: {
            errorMessage: "User email must be an email"
        },
        notEmpty: {
            errorMessage: "User email is required"
        }
    },
    type: {
        custom: {
            options: value => Object.values(type_user).includes(value),
            errorMessage: "Invalid user type"
        },
        notEmpty: {
            errorMessage: "User type is required"
        }
    },
    isAdmin: {
        isBoolean: {
            errorMessage: "isAdmin must be a bool number"
        },
        notEmpty: {
            errorMessage: "isAdmin is required"
        }
    },
    password: {
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
    confirmPassword: {
        isString: {
            errorMessage: "User password must be a string"
        },
        notEmpty: {
            errorMessage: "User password is required"
        },
        custom: {
            options: (value, {req})=> value === req.body.password,
            errorMessage: "Passwords do not match"
        }
    }
    
}


export const userSchema = {
    signup,

}