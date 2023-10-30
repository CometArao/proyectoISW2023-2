"use strict";
const Solicitud = require("../models/solicitud.model.js");
const { handleError } = require("../utils/errorHandler.js");
const TarjetaVecino = require("../models/tarjetaVecino.model.js");

/**
 * Crea una nueva solicitud en la base de datos.
 * @param {object} solicitud objeto de solicitud
 * @returns {Promise} Promesa con el objeto de solicitud creado
 **/
async function createSolicitud(solicitud) {
  try {
    const { Cliente, Fecha, Estado } = solicitud;
    const solicitudEncontrada = await Solicitud.findOne({
      Cliente: Solicitud.Cliente,
    });
    if (solicitudEncontrada) {
        return [null, "El cliente ya habia solicitado antes"];
    }

    const nuevaSolicitud = new Solicitud({
      Cliente,
      Fecha,
      Estado,
    });
    await nuevaSolicitud.save();
    return [nuevaSolicitud, null];
  } catch (error) {
    handleError(error, "solicitud.service -> createSolicitud");
  }
}
/**
 * Obtiene todas las solicitudes de la base de datos.
 * @returns {Promise} Promesa con el objeto de solicitudes
 **/
async function getSolicitudes() {
    try {
        const solicitudes = await Solicitud.find();
        if (!solicitudes) return [null, "No hay solicitudes"];
        return [solicitudes, null];
    } catch (error) {
        handleError(error, "solicitud.service -> getSolicitudes");
    }
}

   /**
    * Obtiene una solicitud por su id
    * @param {string} Id de la solicitud
    * @returns {Promise} Promesa con el objeto de solicitud
    **/
async function getSolicitudById(id) {
    try {
        const solicitud = await Solicitud.findById({ _id: id });

        if (!solicitud) return [null, "La solicitud no existe"];
            return [solicitud, null];
    } catch (error) {
        handleError(error, "solicitud.service -> getSolicitudById");
    }
   }

   /**
    Actualiza una solicitud por su id
    * @param {string} Id de la solicitud
    * @param {object} solicitud objeto de solicitud
    * @returns {Promise} Promesa con el objeto de solicitud actualizado
    **/
async function updateEstadoById(id, solicitud) {
    try {
        const solicitudEncontrada = await Solicitud.findById({ _id: id });
        if (!solicitudEncontrada) return [null, "La solicitud no existe"];

        if (solicitudEncontrada.Estado !== "Derivada") {
            return [null, "Solo se pueden cambiar solicitudes con estado 'Derivada'"];
        }


        // Actualizar la solicitud con el nuevo estado
        const solicitudActual = await Solicitud.findByIdAndUpdate(
            id,
            {
                Estado: solicitud.Estado,
                MotivoRechazo: solicitud.MotivoRechazo,
            },
            { new: true },
        );

        // Si la solicitud es aceptada o rechazada, crear una nueva TarjetaVecino

        if (["Aceptada", "Rechazada", "Derivada"].includes(solicitud.Estado)) {
            const nuevaTarjeta = new TarjetaVecino({
                Solicitud: id,
                Cliente: solicitudEncontrada.Cliente,
                Estado: solicitud.Estado,
                MotivoRechazo: solicitud.MotivoRechazo,
            });
            await nuevaTarjeta.save();
        }

        return [solicitudActual, null];
    } catch (error) {
        handleError(error, "solicitud.service -> updateSolicitudById");
     }
   }
   /**
    * Elimina una solicitud por su id
    * @param {string} Id de la solicitud
    * @returns {Promise} Promesa con el objeto de solicitud eliminado
    */
   async function deleteSolicitud(id) {
    try {
    const { Estado, MotivoRechazo } = solicitud;
    const solicitudActual = await Solicitud.findByIdAndUpdate(
      id,
      {
        Estado,
        MotivoRechazo,
      },
      { new: true },
    );
    return [solicitudActual, null];
  } catch (error) {
    handleError(error, "solicitud.service -> updateSolicitudById");
  }
}
/**
 * Elimina una solicitud por su id
 * @param {string} Id de la solicitud
 * @returns {Promise} Promesa con el objeto de solicitud eliminado
 */
async function deleteSolicitud(id) {
  try {
    return await Solicitud.findByIdAndDelete({ _id: id });
  } catch (error) {
    handleError(error, "solicitud.service -> deleteSolicitud");
  }
}

module.exports = {
  createSolicitud,
  getSolicitudes,
  getSolicitudById,
  updateEstadoById,
  deleteSolicitud,
};
