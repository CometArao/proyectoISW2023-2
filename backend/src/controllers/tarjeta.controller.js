"use strict";

const Tarjeta = require("../models/tarjeta.model");
const Cliente = require("../models/cliente.model"); // Importa el modelo de Cliente
const { respondSuccess, respondError } = require("../utils/resHandler");
const { handleError } = require("../utils/errorHandler");
const nodemailer = require("nodemailer");

// Configura el transporte para el envío de correos.
// No need to declare nodemailer again, as it has already been declared above.

// Configura el transporte para el envío de correos.
const transporter = nodemailer.createTransport({
    service: "email", // Elige el servicio de correo que desees utilizar.
    auth: {
        user: "admin@gmail.com", // Reemplaza con tu dirección de correo.
        pass: "admin123", // Reemplaza con tu contraseña.
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
        // Prioriza las solicitudes según ciertas restricciones (por ejemplo, adultos mayores y embarazadas).
        const listaPriorizada = TarjetaService.priorizarSolicitudes(solicitudes);
        // Devuelve la lista priorizada.
        return respondSuccess(res, { "data": listaPriorizada });
    } catch (error) {
        handleError(error, "tarjeta.controller -> generarListadoPrioridad");
        return respondError(req, res, 500, error.message);
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
        // Obtiene las tarjetas emitidas desde el cuerpo de la solicitud.
        const tarjetasEmitidas = req.body.data;

        // Implementa la lógica para notificar a los usuarios aquí.
        for (const tarjeta of tarjetasEmitidas) {
            const cliente = await Cliente.findOne({ Correo: tarjeta.Correo });
            // Busca al cliente por su correo electrónico.
            if (cliente) {
                // Si se encontró el cliente, puedes enviar un correo de notificación.
                const mailOptions = {
                    from: "admin@email.com", // Reemplaza con tu dirección de correo.
                    to: cliente.Correo, // Correo del cliente.
                    subject: "¡Tu Tarjeta Vecino ha sido emitida!",
                    text: "Tu Tarjeta Vecino ha sido emitida con éxito.",
                };
                // Envía el correo electrónico.
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        // console.log(error);
                    } else {
                       //  console.log("Correo enviado: " + info.response);
                    }
                });
            }
        }
        // Devuelve las notificaciones.
        return respondSuccess(res, { data: "Notificaciones enviadas exitosamente" });
    } catch (error) {
        handleError(error, "tarjeta.controller -> notificarUsuariosTarjetasEmitidas");
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
        const tarjeta = new Tarjeta(req.body);
        const nuevaTarjeta = await tarjeta.save();
        return respondSuccess(res, { data: nuevaTarjeta });
    } catch (error) {
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
        return respondSuccess(res, { data: tarjetas });
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
        return respondSuccess(res, { data: tarjeta });
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
        const tarjetaActualizada = await Tarjeta.findByIdAndUpdate(id, req.body, { new: true });
        if (!tarjetaActualizada) {
            return respondError(req, res, 404, "Tarjeta no encontrada");
        }
        return respondSuccess(res, { data: tarjetaActualizada });
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
        return respondSuccess(res, { data: tarjetaEliminada });
    } catch (error) {
        handleError(error, "tarjeta.controller -> eliminarTarjeta");
        return respondError(req, res, 500, error.message);
    }
}

module.exports = {
    generarListadoPrioridad,
    notificarUsuariosTarjetasEmitidas,
    crearTarjeta,
    obtenerTarjetas,
    obtenerTarjetaPorId,
    actualizarTarjeta,
    eliminarTarjeta,
};
