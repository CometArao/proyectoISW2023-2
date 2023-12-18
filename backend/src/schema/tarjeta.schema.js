const Joi = require("joi");

const tarjetaSchema = Joi.object({
  nombre: Joi.string().required(),
  comuna: Joi.string().required(),
  rut: Joi.string().pattern(/^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9kK]$/).required(),
  fechaVencimiento: Joi.date().iso().required(),
  estado: Joi.string().valid("activa", "bloqueada", "vencida").default("activa"),
});

module.exports = tarjetaSchema;

