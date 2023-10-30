"use strict";
const { respondError } = require("../utils/resHandler.js");
const fechaRegex = /^\d{2}\/\d{2}\/\d{4}$/; // Para validar el formato "DD/MM/YYYY"

/**
 * Verifica que la fecha en la solicitud tenga el formato "DD/MM/YYYY".
 * @param {Object} req - Objeto de petición que incluye la fecha de la solicitud.
 * @param {Object} res - Objeto de respuesta.
 * @param {Function} next - Función para continuar con la siguiente función en la cadena.
 */
const solicitudFechaValidation = (req, res, next) => {
    if (!fechaRegex.test(req.body.Fecha)) {
      return res.status(400).json({
          message: "La fecha debe estar en formato DD/MM/YYYY.",
      });
    }
    next();
};

module.exports = solicitudFechaValidation;
