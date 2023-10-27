"use strict";
const Solicitud = require("../models/solicitud.model.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Crea una nueva solicitud en la base de datos
 * @param {object} solicitud objeto de solicitud
 * @returns {Promise} promesa con el objeto de solicitud creado
 **/
 async function createSolicitud(solicitud) {
    try {
        const { Cliente, Fecha, Estado } = Solicitud;
        const solicitudEncontrada = await cardApplication.findOne({ Cliente: Solicitud.Cliente });
        if (solicitudEncontrada) return [null, "El cliente ya habia solicitado antes"];
        const nuevaSolicitud = new solicitud({
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
        const solicitud = await Solicitud.findById({ _id: id })
            .populate("Cliente")
            .exec();

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
   async function updateSolicitudById(id, solicitud) {
    try {
        const solicitudEncontrada = await Solicitud.findById({ _id: id });
        if (!solicitudEncontrada) return [null, "La solicitud no existe"];

        const { Cliente, Fecha, Estado } = solicitud;
        const solicitudActual = await Solicitud.findByIdAndUpdate(
            id,
            {
                Cliente,
                Fecha,
                Estado,
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
    updateSolicitudById, // modificar luego para que se actualice solo el estado
    deleteSolicitud,

};
