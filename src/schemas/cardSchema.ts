import Joi from "joi";

export const cardSchema = Joi.object({
    title: Joi.string().required(),
    number: Joi.number().required(),
    name: Joi.string().required(),
    cvc: Joi.number().required(),
    expireIn: Joi.string().required(),
    password: Joi.number().required(),
    isVirtual: Joi.boolean().required(),
    type: Joi.string().valid('credit', 'debit', 'hybrid').required(),
})