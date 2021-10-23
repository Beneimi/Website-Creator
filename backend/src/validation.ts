import * as joi from 'joi';

export const registerValidation = (data) =>{
    const registerValidationSchema = joi.object({
        name : joi.string()
            .min(5)
            .required(),
        email: joi.string()
            .email(),
        password: joi.string()
            .min(8)
            .required()
    });
    
    return registerValidationSchema.validate(data, {abortEarly: false});
};

export const loginValidation = (data) =>{
    const loginValidationSchema = joi.object({
        email: joi.string()
            .email(),
        password: joi.string()
            .min(8)
            .required()
    });
    
    return loginValidationSchema.validate(data);
};

export const createValidation = (data) =>{
    const createValidationSchema = joi.object({
        title: joi.string()
            .required(),
        content: joi.string()
    });

    return createValidationSchema.validate(data);
};

export const emailValidation = (data) =>{
    const emailValidationSchema = joi.object({
        email: joi.string()
            .email(),
    });

    return emailValidationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

