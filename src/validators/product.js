import Joi from "joi";

export const productschema = Joi.object ({
    name: Joi.string().min(3).max(100).required(),
    price:Joi.number().positive().required(),
    description: Joi.string().min(10).required(),
    stock: Joi.number().min(0).required(),
    categoryId: Joi.number().integer().required()
});