"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const LocationService = require("../services/location.service");
const { handleError } = require("../utils/errorHandler");
// const { Region, Commune }= require("../models/location.model.js");
const { locationIdSchema } = require("../schema/location.schema");

/**
 * Obtiene todas las regiones
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getRegions(req, res) {
    try {
        const [regions, errorRegions] = await LocationService.getRegions();
        if (errorRegions) return respondError(req, res, 404, errorRegions);

        regions.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, regions);
    } catch (error) {
        handleError(error, "location.controller -> getRegions");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene todas las comunas
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getCommunes(req, res) {
    try {
        const [communes, errorCommunes] = await LocationService.getCommunes();
        if (errorCommunes) return respondError(req, res, 404, errorCommunes);

        communes.length === 0
            ? respondSuccess(req, res, 204)
            : respondSuccess(req, res, 200, communes);
    } catch (error) {
        handleError(error, "location.controller -> getCommunes");
        respondError(req, res, 400, error.message);
    }
}

/**
 * Obtiene una ubicación por su ID.
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getLocationById(req, res) {
    try {
        const { params } = req;
        const { error: paramsError } = locationIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        let location;
        let error;
        if (params.id) {
            [location, error] = await LocationService.getCommuneById(params.id);
            if (!location) {
                [location, error] = await LocationService.getRegionById(params.id);
            }
        }

        if (error) return respondError(req, res, 404, error);

        respondSuccess(req, res, 200, location);
    } catch (error) {
        handleError(error, "location.controller -> getLocationById");
        respondError(req, res, 400, error.message);
    }
}

// /**
//  * Obtiene una región por su ID
//  * @param {Object} req - Objeto de petición
//  * @param {Object} res - Objeto de respuesta
//  */
// async function getRegionById(req, res) {
//     try {
//         const { params } = req;
//         const { error: paramsError } = locationIdSchema.validate(params);
//         if (paramsError) return respondError(req, res, 400, paramsError.message);
//         const [region, errorRegion] = await LocationService.getRegionById(params.id);
//         if (errorRegion) return respondError(req, res, 404, errorRegion);

//         respondSuccess(req, res, 200, region);
//     } catch (error) {
//         handleError(error, "location.controller -> getRegionById");
//         respondError(req, res, 400, error.message);
//     }
// }

// /**
//  * Obtiene una comuna por su ID
//  * @param {Object} req - Objeto de petición
//  * @param {Object} res - Objeto de respuesta
//  */
// async function getCommuneById(req, res) {
//     try {
//         const { params } = req;
//         const { error: paramsError } = locationIdSchema.validate(params);
//         if (paramsError) return respondError(req, res, 400, paramsError.message);

//         const [commune, errorCommune] = await LocationService.getCommuneById(params.id);
//         if (errorCommune) return respondError(req, res, 404, errorCommune);

//         respondSuccess(req, res, 200, commune);
//     } catch (error) {
//         handleError(error, "location.controller -> getCommuneById");
//         respondError(req, res, 400, error.message);
//     }
// }

module.exports = {
    getRegions,
    getCommunes,
    getLocationById,
    // getRegionById,
    // getCommuneById,
};
