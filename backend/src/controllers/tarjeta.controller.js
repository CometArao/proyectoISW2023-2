"use strict";

const Tarjeta = require("../models/tarjeta.model");
const Cliente = require("../models/cliente.model"); // Importa el modelo de Cliente
const Solicitud = require("../models/solicitud.model");
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");

// eslint-disable-next-line no-unused-vars
const nodemailer = require("nodemailer");
const tarjetaSchema = require("../schema/tarjeta.schema"); 
const { enviarNotificacionDeEmision } = require("../utils/notificationService");
require("pdf-lib");



// Configura el transporte para el envío de correos.
// No need to declare nodemailer again, as it has already been declared above.

// Configura el transporte para el envío de correos.

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "84a0a79610b71a",
    pass: "68945da02c9dd6",
  },
});


// Generar un listado priorizado de solicitudes de Tarjetas Vecino
/**
 * Genera un listado priorizado de solicitudes de Tarjetas Vecino.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con la lista priorizada de solicitudes.
 */
async function generarListadoPrioridad(req, res) {
  try {
    // Obtiene las solicitudes de Tarjetas Vecino que han sido aceptadas.
    const solicitudes = await Cliente.find({
      $or: [
        { Embarazada: true },
        { AdultoMayor: true },
        { Discapacidad: true },
      ],
    });

    // Devuelve la lista priorizada.
    return respondSuccess(req, res, 201, { data: solicitudes });
  } catch (error) {
    handleError(error, "tarjeta.controller -> generarListadoPrioridad");
    respondError(req, res, 500, error.message);
  }
}

/**
 * Notifica a los usuarios sobre la emisión exitosa de sus tarjetas.
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @returns {Object} - Objeto de respuesta HTTP con las notificaciones.
 */
async function notificarUsuariosTarjetasEmitidas(req, res) {
  try {

    const solicitudes = await Solicitud.find({ Estado: "Aceptado" }).populate(
      "Cliente",
    );
    for (const solicitud of solicitudes) {
      const mailOptions = {
        from: "admin@email.com",
        to: solicitud.Cliente?.Correo ?? "correo@mail.cl", // Correo del cliente.
        subject: "¡Tu Tarjeta Vecino ha sido emitida!",
        text: "Tu Tarjeta Vecino ha sido emitida con éxito.",
      };
      // Envía el correo electrónico.
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          respondError(req, res, 500, error.message);
        }
      });
    }

    return respondSuccess(req, res, 200, "Correos enviados satisfactoriamente");
  } catch (error) {
    handleError(
      error,
      "tarjeta.controller -> notificarUsuariosTarjetasEmitidas",
    );

    respondError(req, res, 500, error.message);
  }
}

/**
 * Crea una nueva tarjeta.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con la nueva tarjeta creada.
 */
async function crearTarjeta(req, res) {
  try {

    // Valida los datos de entrada con Joi antes de crear la tarjeta
    await tarjetaSchema.validateAsync(req.body);

    const tarjeta = new Tarjeta(req.body);
    const nuevaTarjeta = await tarjeta.save();
    const pathPDF = await crearPDFDeTarjeta(nuevaTarjeta);
    await enviarNotificacionDeEmision(correoDelUsuario, infoDeLaTarjeta, pathPDF);

    return respondSuccess(req, res, 201, nuevaTarjeta);
  } catch (error) {
    // Asegúrate de manejar los errores de validación de Joi y otros errores

    handleError(error, "tarjeta.controller -> crearTarjeta");
    return respondError(req, res, 500, error.message);
  }
}


/**
 * Obtiene todas las tarjetas.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con todas las tarjetas.
 */
async function obtenerTarjetas(req, res) {
  try {
    const tarjetas = await Tarjeta.find();
    return respondSuccess(req, res, 200, tarjetas);
  } catch (error) {
    handleError(error, "tarjeta.controller -> obtenerTarjetas");
    return respondError(req, res, 500, error.message);
  }
}

/**
 * Obtiene una tarjeta por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con la tarjeta encontrada.
 */
async function obtenerTarjetaPorId(req, res) {
  const { id } = req.params;
  try {
    const tarjeta = await Tarjeta.findById(id);
    if (!tarjeta) {
      return respondError(req, res, 404, "Tarjeta no encontrada");
    }
    return respondSuccess(req, res, 200, tarjeta);
  } catch (error) {
    handleError(error, "tarjeta.controller -> obtenerTarjetaPorId");
    return respondError(req, res, 500, error.message);
  }
}


// Actualizar una tarjeta por su ID
/**
 * Actualiza una tarjeta por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con la tarjeta actualizada.
 */
async function actualizarTarjeta(req, res) {
  const { id } = req.params;
  try {
    const tarjetaActualizada = await Tarjeta.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!tarjetaActualizada) {
      return respondError(req, res, 404, "Tarjeta no encontrada");
    }
    return respondSuccess(req, res, 200, tarjetaActualizada);
  } catch (error) {
    handleError(error, "tarjeta.controller -> actualizarTarjeta");
    return respondError(req, res, 500, error.message);
  }
}

// Eliminar una tarjeta por su ID
/**
 * Elimina una tarjeta por su ID.
 * @param {Object} req - Objeto de solicitud de Express.
 * @param {Object} res - Objeto de respuesta de Express.
 * @returns {Object} Objeto de respuesta con la tarjeta eliminada.
 */
async function eliminarTarjeta(req, res) {
  const { id } = req.params;
  try {
    const tarjetaEliminada = await Tarjeta.findByIdAndRemove(id);
    if (!tarjetaEliminada) {
      return respondError(req, res, 404, "Tarjeta no encontrada");
    }
    return respondSuccess(req, res, 200, tarjetaEliminada);
  } catch (error) {
    handleError(error, "tarjeta.controller -> eliminarTarjeta");
    return respondError(req, res, 500, error.message);
  }
}

module.exports = {
  generarListadoPrioridad,

  enviarNotificacionDeEmision,

  notificarUsuariosTarjetasEmitidas,
  crearTarjeta,
  obtenerTarjetas,
  obtenerTarjetaPorId,
  actualizarTarjeta,
  eliminarTarjeta,
};
