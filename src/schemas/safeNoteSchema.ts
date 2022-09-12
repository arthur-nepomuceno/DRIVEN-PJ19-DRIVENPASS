import Joi from "joi";

export const safeNoteSchema = Joi.object({
    title: Joi.string().max(50).required(),
    text: Joi.string().max(1000).required()
})