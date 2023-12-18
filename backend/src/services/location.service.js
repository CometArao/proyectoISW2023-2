"use strict";

const { Region, Commune }= require("../models/location.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Get all regions.
 *
 * @returns {Promise<[Array<Region> | null, string | null]>} The regions or an error message.
 */
/**
 * Get all regions.
 *
 * @returns {Promise<[Array<Region> | null, string | null]>} The regions or an error message.
 */
async function getRegions() {
    try {
        const regions = await Region.find();
        if (!regions) return [null, "No hay regiones"];

        return [regions, null];
    } catch (error) {
        handleError(error, "location.service -> getRegions");
    }
}

/**
 * Get all communes.
 *
 * @returns {Promise<[Array<Commune> | null, string | null]>} The communes or an error message.
 */
async function getCommunes() {
    try {
        const communes = await Commune.find();
        if (!communes) return [null, "No hay comunas"];

        return [communes, null];
    } catch (error) {
        handleError(error, "location.service -> getCommunes");
    }
}

async function getRegionById(id) {
    try {
        const region = await Region.findById(id);
        if (!region) return [null, "No existe la región"];

        return [region, null];
    } catch (error) {
        handleError(error, "location.service -> getRegionById");
    }
}

async function getCommuneById(id) {
    try {
        const commune = await Commune.findById(id);
        if (!commune) return [null, "No existe la comuna"];

        return [commune, null];
    } catch (error) {
        handleError(error, "location.service -> getCommuneById");
    }
}

module.exports = {
    getRegions,
    getCommunes,
    getRegionById,
    getCommuneById,
};
