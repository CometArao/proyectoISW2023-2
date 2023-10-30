"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const SolicitudService = require("../services/cardApplication.service.js");
const { handleError } = require("../utils/errorHandler");
/**
 * Obtidene todas las solicitudes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getSolicitudes(req, res) {
    try {
        const [solicitudes, errorSolicitudes] = await SolicitudService.getSolicitudes();
        if (errorSolicitudes) return respondError(req, res, 404, errorSolicitudes);

        solicitudes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, solicitudes);
    } catch (error) {
        handleError(error, "solicitud.controller -> getSolicitudes");
        respondError(req, res, 400, error.message);
    }
}
/**
 * Crea una nueva solicitud
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
 async function createSolicitud(req, res) {
    try {
        const { body } = req;

        const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body);
        if (solicitudError) return respondError(req, res, 400, solicitudError);
        if (!newSolicitud) {
            return respondError(req, res, 400, "No se creo la solicitud");
        }
        respondSuccess(req, res, 201, newSolicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> createSolicitud");
        respondError(req, res, 500, "No se creó la solicitud");
    }
 }
/**
 * Obtiene una solicitud por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */ 
async function getSolicitudById(req, res) {
try {
    const { params } = req;
    const [solicitud, errorSolicitud] = await SolicitudService.getSolicitudById(params.id);
    if (errorSolicitud) return respondError(req, res, 404, errorSolicitud);
respondSuccess(req, res, 200, solicitud);
} catch (error) {
    handleError(error, "solicitud.controller -> getSolicitudById");
    respondError(req, res, 500, "No se obtuvo la solicitud");
    }
}
/**
 * Actualiza el estado de la solicitud por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 **/
 async function updateEstado(req, res) {
  try {
        const { params, body } = req;

        // Si no se ingresa 
        if (body.Estado === "Rechazado" && !body.MotivoRechazo) {
            return respondError(req, res, 400, "No se ingresó el motivo de rechazo");
        }

        if (body.Estado !== "Rechazado") {
            body.MotivoRechazo = null;
        }

        const [solicitud, solicitudError] = 
        await SolicitudService.updateEstadoById(params.id, body);

        
        if (solicitudError) return respondError(req, res, 400, solicitudError);
        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> updateEstado");
        respondError(req, res, 500, "No se actualizo el estado de la solicitud");
    }
 }
 /**
  * Se elimina una solicitud por su id
  * @param {Object} req - Objeto de petición
  * @param {Object} res - Objeto de respuesta
  */
 async function deleteSolicitud(req, res) {
    try {
        const { params } = req;
        const solicitud = await SolicitudService.deleteSolicitud(params.id);
        if (!solicitud) return respondError(req, res, 404, "no se encuentra la solicitud");
        respondSuccess(req, res, 200, solicitud);
    } catch (error) {
        handleError(error, "solicitud.controller -> deleteSolicitud");
        respondError(req, res, 500, "No se  pudo eliminar la solicitud");
    }
 }

module.exports = {
createSolicitud,
getSolicitudes,
getSolicitudById,
updateEstado, // revisar si funciona
deleteSolicitud,

};
