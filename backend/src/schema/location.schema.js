"use strict";

const Joi = require("joi");

const locationIdSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "El ID no puede estar vacío.",
        "any.required": "El ID es obligatorio.",
        "string.pattern.base": "El ID no es válido.",
    }),
});

module.exports = { locationIdSchema };
