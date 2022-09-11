import Joi from "joi";

export const credentialSchema = Joi.object({
    title: Joi.string().min(5).required(),
    url: Joi.string().uri().required(),
    urlUser: Joi.string().required(),
    urlPassword: Joi.string().min(10).required()
})