"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const AgreementService = require("../services/agreement.service");
const { agreementBodySchema, agreementIdSchema } = require("../schema/agreement.schema");
const { handleError } = require("../utils/errorHandler");
const { uploadImg } = require("../config/configMulterImages");

/**
 * Obtiene todos los convenios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getAgreements(req, res) {
    try {
        const [agreements, errorAgreements] = await AgreementService.getAgreements();
        if (errorAgreements) return respondError(req, res, 404, errorAgreements);

        agreements.length === 0 ?
            respondSuccess(req, res, 204) :
            respondSuccess(req, res, 200, agreements);
    } catch (error) {
        handleError(error, "agreement.controller -> getAgreements");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene convenios por región
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getAgreementsByRegion(req, res) {
    try {
        const { params } = req;
        // const { error: paramsError } = agreementIdSchema.validate(params);
        // if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [agreements, errorAgreements] = await AgreementService.getAgreementsByRegion(params.region);
        if (errorAgreements) return respondError(req, res, 404, errorAgreements);

        respondSuccess(req, res, 200, agreements);
    } catch (error) {
        handleError(error, "agreement.controller -> getAgreementsByRegion");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene convenios por región y comuna
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getAgreementsByRegionAndCommune(req, res) {
    try {
        const { params } = req;
        //const { error: paramsError } = agreementIdSchema.validate(params);
        //if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [agreements, errorAgreements] = await AgreementService.getAgreementsByRegionAndCommune(params.region, params.commune);
        if (errorAgreements) return respondError(req, res, 404, errorAgreements);

        respondSuccess(req, res, 200, agreements);
    } catch (error) {
        handleError(error, "agreement.controller -> getAgreementsByRegionAndCommune");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Crea un nuevo convenio
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function createAgreement(req, res) {
    try {
        const { body, file } = req; // Obtiene los datos del convenio y la imagen

        const { error: bodyError } = agreementBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        // Verifica que se haya subido una imagen
        if (!file) {
            // Si no se proporciona una imagen, se utiliza la imagen default
            body.image = 'default.jpg';
        }else {
            // Si se proporciona una imagen, utiliza el nombre del archivo subido
            body.image = file.filename;
        }

        const [newAgreement, agreementError] = await AgreementService.createAgreement(body);

        if (agreementError) return respondError(req, res, 400, agreementError);
        if (!newAgreement) {
            return respondError(req, res, 400, "No se creó el convenio");
        }

        respondSuccess(req, res, 201, newAgreement);
    } catch (error) {
        handleError(error, "agreement.controller -> createAgreement");
        respondError(req, res, 500, "No se creó el convenio");
    }
}

/**
 * Obtiene un convenio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function getAgreementById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = agreementIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [agreement, errorAgreement] = await AgreementService.getAgreementById(params.id);
        if (errorAgreement) return respondError(req, res, 404, errorAgreement);

        respondSuccess(req, res, 200, agreement);
    } catch (error) {
        handleError(error, "agreement.controller -> getAgreementById");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Actualiza un convenio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function updateAgreement(req, res) {
    try {
        const { params, body } = req;
        const { error: paramsError } = agreementIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const { error: bodyError } = agreementBodySchema.validate(body);
        if (bodyError) return respondError(req, res, 400, bodyError.message);

        const [agreement, errorAgreement] = await AgreementService.updateAgreementById(params.id, body);
        if (errorAgreement) return respondError(req, res, 404, errorAgreement);

        respondSuccess(req, res, 200, agreement);
    } catch (error) {
        handleError(error, "agreement.controller -> updateAgreement");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Elimina un convenio por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */

async function deleteAgreement(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = agreementIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        const [agreement, errorAgreement] = await AgreementService.deleteAgreementById(params.id);
        if (errorAgreement) return respondError(req, res, 404, errorAgreement);

        respondSuccess(req, res, 200, agreement);
    } catch (error) {
        handleError(error, "agreement.controller -> deleteAgreement");
        respondError(req, res, 400, error.message);
    }
}

module.exports = {
    getAgreements,
    createAgreement,
    getAgreementById,
    updateAgreement,
    deleteAgreement,
    getAgreementsByRegion,
    getAgreementsByRegionAndCommune,
};