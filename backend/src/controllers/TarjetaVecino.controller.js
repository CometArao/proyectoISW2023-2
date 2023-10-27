"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const tarjetavecinoService = require("../services/TarjetaVecino.service");
// const { TVBodySchema, TVIdSchema } = require("../schema/TarjetaVecino.schema"); //validar el esquema
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los tarjetas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function gettarjetavecinos(req, res) {
    try {
        const [tarjetas, errorTarjetas] = await tarjetavecinoService.getTarjetas();
        if (errorTarjetas) return respondError(req, res, 404, errorTarjetas);

        tarjetas.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, tarjetas);
    } catch (error) {
        handleError(error, "tarjetavecino.controller -> gettarjetavecinos");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo usuario
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

/** 
async function createtarjetavecino(req, res) {
    try {
        const { body } = req;
        const { error: bodyError } = TVBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [newtarjetavecino, tarjetavecinoError] = await tarjetavecinoService.createtarjetavecino(body);

        if (tarjetavecinoError) return respondError(req, res, 400, tarjetavecinoError);
        if (!newtarjetavecino) {
            return respondError(req, res, 400, "No se creo el usuario");
        }

        respondSuccess(req, res, 201, newtarjetavecino);
    } catch (error) {
        handleError(error, "tarjetavecino.controller -> createtarjetavecino");
        respondError(req, res, 500, "No se creo el usuario");
    }
}


/**
 * Obtiene un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
/** 
async function gettarjetavecinoById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = tarjetavecinoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [tarjetavecino, errortarjetavecino] = await tarjetavecinoService.gettarjetavecinoById(params.id);

        if (errortarjetavecino) return respondError(req, res, 404, errortarjetavecino);

        respondSuccess(req, res, 200, tarjetavecino);
    } catch (error) {
        handleError(error, "tarjetavecino.controller -> gettarjetavecinoById");
        respondError(req, res, 500, "No se pudo obtener el usuario");
    }
}

/**
 * Actualiza un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

/** 
async function updatetarjetavecino(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = tarjetavecinoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = tarjetavecinoBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [tarjetavecino, tarjetavecinoError] = await tarjetavecinoService.updatetarjetavecino(params.id, body);

        if (tarjetavecinoError) return respondError(req, res, 400, tarjetavecinoError);

        respondSuccess(req, res, 200, tarjetavecino);
    } catch (error) {
        handleError(error, "tarjetavecino.controller -> updatetarjetavecino");
        respondError(req, res, 500, "No se pudo actualizar el usuario");
    }
}

/**
 * Elimina un usuario por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

/** 
async function deletetarjetavecino(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = tarjetavecinoIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const tarjetavecino = await tarjetavecinoService.deletetarjetavecino(params.id);
        !tarjetavecino
            ? respondError(
                req,
                res,
                404,
                "No se encontro el usuario solicitado",
                "Verifique el id ingresado",
            )
            : respondSuccess(req, res, 200, tarjetavecino);
    } catch (error) {
        handleError(error, "tarjetavecino.controller -> deletetarjetavecino");
        respondError(req, res, 500, "No se pudo eliminar el usuario");
    }
}
*/

module.exports = {
    gettarjetavecinos,
    /**
     * createtarjetavecino,
    gettarjetavecinoById,
    updatetarjetavecino,
    deletetarjetavecino, */
};
