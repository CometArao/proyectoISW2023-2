"use strict";

const cliente = require("../models/cliente.model.js");

/**
 * Comprueba si los campos requeridos están presentes en la solicitud
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
function validarCamposRequeridos(req, res, next) {
  const body = req.body;

  // Obtener los campos del modelo 'cliente'
  const camposDelModelo = Object.keys(cliente.schema.paths);
  const camposRequeridos = camposDelModelo.filter(campo => cliente.schema.paths[campo].isRequired);

  // Verificar si todos los campos requeridos están presentes en la solicitud
  const camposFaltantes = camposRequeridos.filter((campo) => body[campo] === undefined);
  
  if (camposFaltantes.length > 0) {
    return res.status(400).json({ 
        error: "Todos los campos son obligatorios", 
        camposFaltantes: camposFaltantes,
    });
  }
  next();
}

/**
 * Comprueba si los campos requeridos están presentes en la solicitud
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 * @param {Function} next - Función para continuar con la siguiente función
 */
function verificarFormatoCorreo(req, res, next) {
  const correo = req.body.Correo;

  // Expresión regular para validar el formato de correo electrónico
  const regexCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

  if (!regexCorreo.test(correo)) {
    return res.status(400).json({
      error: "El formato del correo electrónico es inválido.",
    });
  }

  next();
}
  
module.exports = {
  validarCamposRequeridos,
  verificarFormatoCorreo,
};
