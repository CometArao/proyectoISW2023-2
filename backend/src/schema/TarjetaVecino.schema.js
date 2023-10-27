"use strict";

const Joi = require("joi");

/**
 * Esquema de validación para el cuerpo de la solicitud de usuario.
 * @constant {Object}
 */
const tarjetavecinoBodySchema = Joi.object({
  Nombre: Joi.string().required().messages({
    "string.empty": "El nombre no puede estar vacío.",
    "any.required": "El nombre es obligatorio.",
    "string.base": "El nombre debe ser de tipo string.",
  }),
  ApellidoPaterno: Joi.string().required().messages({
    "string.empty": "El Apellido Paterno no puede estar vacío.",
    "any.required": "El Apellido Paterno es obligatorio.",
    "string.base": "El Apellido Paterno debe ser de tipo string.",
  }),
  ApellidoMaterno: Joi.string().required().messages({
    "string.empty": "El Apellido Materno no puede estar vacío.",
    "any.required": "El Apellido Materno es obligatorio.",
    "string.base": "El Apellido Materno debe ser de tipo string.",
  }),

  RUT: Joi.int().required().messages({
    "int.empty": "El RUT no puede estar vacío.",
    "any.required": "El RUT es obligatorio.",
    "int.base": "El RUT debe ser de tipo string.",
  }),

  Prioridad: Joi.string().required().messages({
    "string.empty": "La prioridad no puede estar vacía.",
    "any.required": "La prioridad es obligatorio.",
    "string.base": "La prioridad debe ser de tipo string.",
  }),
}).messages({
  "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de usuario.
 * @constant {Object}
 */
const tarjetavecinoIdSchema = Joi.object({
  id: Joi.string()
    .required()
    .pattern(/^(?:[0-9a-fA-F]{24}|[0-9a-fA-F]{12})$/)
    .messages({
      "string.empty": "El id no puede estar vacío.",
      "any.required": "El id es obligatorio.",
      "string.base": "El id debe ser de tipo string.",
      "string.pattern.base": "El id proporcionado no es un ObjectId válido.",
    }),
});

module.exports = { tarjetavecinoBodySchema, tarjetavecinoIdSchema };
