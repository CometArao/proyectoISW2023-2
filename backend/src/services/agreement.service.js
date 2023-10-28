"use strict";

import Agreement from "../../models/agreement.model.js";
const {handleError} = require("../../utils/errorHandler");

/**
* Obtiene todos los convenios de la base de datos
* @returns {Promise} Promesa con el objeto de los convenios
*/

async function getAgreements() {
    try {
        const agreements = await Agreement.find();
        if (!agreements) return [null, "No hay convenios"];

        return [agreements, null];
    } catch (error) {
        handleError(error, "agreement.service -> getAgreements");
    }
}

/**
 * Obtiene los convenios por región
 * @param {string} Id de la región
 * @returns {Promise} Promesa con el objeto de convenio
 */

async function getAgreementsByRegion(region) {
    try {
        const agreements = await Agreement.find({region: region});
        if (!agreements) return [null, "No hay convenios"];

        return [agreements, null];
    } catch (error) {
        handleError(error, "agreement.service -> getAgreementsByRegion");
    }
}

/**
 * Obtiene los convenios por región y comuna
 * @param {string} Id de la región
 * @param {string} Id de la comuna
 * @returns {Promise} Promesa con el objeto de convenio
 */

async function getAgreementsByRegionAndCommune(region, commune) {
    try {
        const agreements = await Agreement.find({region: region, commune: commune});
        if (!agreements) return [null, "No hay convenios"];

        return [agreements, null];
    } catch (error) {
        handleError(error, "agreement.service -> getAgreementsByRegionAndCommune");
    }
}


/**
 * Crea un nuevo convenio en la base de datos
 * @param {Object} agreement Objeto de convenio
 * @returns {Promise} Promesa con el objeto de convenio creado
 */

async function createAgreement(agreement) {
    try {
        const {name, description, image, benefit, region, commune, exclusiveSeniors, exclusivePregnant, exclusiveDisability} = agreement;

        const agreementFound = await Agreement.findOne({name: agreement.name});
        if (agreementFound) return [null, "El convenio ya existe"];

        const newAgreement = new Agreement({
            name,
            description,
            image,
            benefit,
            region,
            commune,
            exclusiveSeniors,
            exclusivePregnant,
            exclusiveDisability            
        });
        await newAgreement.save();

        return [newAgreement, null];
    } catch (error) {
        handleError(error, "agreement.service -> createAgreement");
    }
}

/**
 * Obtiene un convenio por su id de la base de datos
 * @param {string} Id del convenio
 * @returns {Promise} Promesa con el objeto de convenio
 */

async function getAgreementById(id) {
    try {
        const agreement = await Agreement.findById(id);
        if (!agreement) return [null, "No existe el convenio"];

        return [agreement, null];
    } catch (error) {
        handleError(error, "agreement.service -> getAgreementById");
    }
}

/**
 * Actualiza un convenio por su id
 * @param {string} Id del convenio
 * @param {Object} agreement Objeto de convenio
 * @returns {Promise} Promesa con el objeto de convenio actualizado
 */

async function updateAgreementById(id, agreement) {
    try {
        const {name, description, region, commune, address, phone, email, web, socialMedia} = agreement;

        const agreementFound = await Agreement.findById(id);
        if (!agreementFound) return [null, "No existe el convenio"];

        const updatedAgreement = await Agreement.findByIdAndUpdate(
            id,
            {
                name,
                description,
                image,
                benefit,
                region,
                commune,
                exclusiveSeniors,
                exclusivePregnant,
                exclusiveDisability
            },
            {
                new: true,
            }
        );

        return [updatedAgreement, null];
    } catch (error) {
        handleError(error, "agreement.service -> updateAgreementById");
    }
}

/**
 * Elimina un convenio por su id
 * @param {string} Id del convenio
 * @returns {Promise} Promesa con el objeto de convenio eliminado
 */

async function deleteAgreementById(id) {
    try {
        const agreement = await Agreement.findByIdAndDelete(id);
        if (!agreement) return [null, "No existe el convenio"];

        return [agreement, null];
    } catch (error) {
        handleError(error, "agreement.service -> deleteAgreementById");
    }
}

module.exports = {
    getAgreements,
    getAgreementsByRegion,
    getAgreementsByRegionAndCommune,
    createAgreement,
    getAgreementById,
    updateAgreementById,
    deleteAgreementById    
};