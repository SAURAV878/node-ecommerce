import Joi from "joi";

export const signupSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName:Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().min(8).required(),
    role: Joi.string().valid('customer', 'seller', 'admin')

});

