import { Schema } from "express-validator";

const signup: Schema = {
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