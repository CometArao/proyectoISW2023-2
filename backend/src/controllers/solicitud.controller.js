"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const SolicitudService = require("../services/cardApplication.service.js");
const { handleError } = require("../utils/errorHandler");
const TarjetaVecino = require("../models/tarjetaVecino.model.js");
const Solicitud = require("../models/solicitud.model.js");

/**
 * Obtidene todas las solicitudes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getSolicitudes(req, res) {
    try {
        const [solicitudes, errorSolicitudes] = await SolicitudService.getSolicitudes();
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

        // Comprobar si el cliente ya tiene una tarjeta vecino

        const tarjetaExistente = await TarjetaVecino.findOne({ Cliente: body.Cliente });
        if (tarjetaExistente) {
            return respondError(req, res, 400, "El cliente ya tiene una solicitud pendiente.");
        }

        // Comprobar si el cliente ya tiene una solicitud pendiente o derivada.
        const solicitudEncontrada = await Solicitud.findOne({ Cliente: body.Cliente });
        if (solicitudEncontrada) {
            return respondError(req, res, 400, "El cliente ya tiene una solicitud pendiente.");
        }

        const [newSolicitud, solicitudError] = await SolicitudService.createSolicitud(body);

        if (solicitudError) {
            return respondError(req, res, 400, solicitudError);
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

// Se crea una función para que el administrador pueda ver los documentos de un cliente de x solicitud
/**
 * Obtiene una solicitud por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */ 
async function getDocumentos(req, res) {
    try {
        const { params } = req;
        const solicitud = await SolicitudService.getSolicitudById(params.id).populate("Cliente");

        if (!solicitud) {
            return res.status(404).json({ message: "Solicitud no encontrada" });
        }

        const documentos = {
            DocumentoCarnet: solicitud.Cliente.DocumentoCarnet,
            DocumentoDiscapacidad: solicitud.Cliente.DocumentoDiscapacidad,
            DocumentoAdultoMayor: solicitud.Cliente.DocumentoAdultoMayor,
            DocumentoEmbarazada: solicitud.Cliente.DocumentoEmbarazada,
        };

        respondSuccess(200).json(documentos);
    } catch (error) {
        handleError(error, "solicitud.controller -> getDocumentos");
        res.status(500).json({ message: 'No se pudieron obtener los documentos' });
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
getDocumentos,
createSolicitud,
getSolicitudes,
getSolicitudById,
updateEstado, // revisar si funciona
deleteSolicitud,

};
