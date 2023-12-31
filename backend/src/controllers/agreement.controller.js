"use strict";

const { respondSuccess, respondError } = require("../utils/resHandler");
const AgreementService = require("../services/agreement.service");
const {
  agreementBodySchema,
  agreementIdSchema,
} = require("../schema/agreement.schema");
const { handleError } = require("../utils/errorHandler");
const { uploadImg } = require("../config/configMulterImages");
const Agreement = require("../models/agreement.model");
const fs = require("fs");

/**
 * Obtiene todos los convenios
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getAgreements(req, res) {
  try {
    const [agreements, errorAgreements] =
      await AgreementService.getAgreements();
    if (errorAgreements) return respondError(req, res, 404, errorAgreements);

    agreements.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, agreements);
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

    const [agreements, errorAgreements] =
      await AgreementService.getAgreementsByRegion(params.region);
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

    const [agreements, errorAgreements] =
      await AgreementService.getAgreementsByRegionAndCommune(
        params.region,
        params.commune,
      );
    if (errorAgreements) return respondError(req, res, 404, errorAgreements);

    respondSuccess(req, res, 200, agreements);
  } catch (error) {
    handleError(
      error,
      "agreement.controller -> getAgreementsByRegionAndCommune",
    );
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

    const [agreement, errorAgreement] = await AgreementService.getAgreementById(
      params.id,
    );
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
        const { params, body, file } = req;
        const { error: paramsError } = agreementIdSchema.validate(params);
        if (paramsError) return respondError(req, res, 400, paramsError.message);

        // Verificar si el convenio con el ID proporcionado existe
        const existingAgreement = await Agreement.findById(params.id);
        if (!existingAgreement) {
            return respondError(req, res, 404, "Convenio no encontrado");
        }

        // Eliminar la imagen anterior si se proporciona una nueva imagen
        if (file) {
          if (existingAgreement.image !== 'default.jpg') {
              const imagePath = `./src/data/images/${existingAgreement.image}`;

              // Verificar si el archivo existe antes de intentar eliminarlo
              if (fs.existsSync(imagePath)) {
                  // Elimina la imagen anterior (excepto 'default.jpg')
                  fs.unlinkSync(imagePath);
              } else {
                  console.warn(`La imagen ${existingAgreement.image} no existe en el sistema de archivos.`);
              }

              // Asigna el nombre de la nueva imagen
              existingAgreement.image = file.filename;
          }
        }

        // Validar y actualizar otros campos del convenio
        if (body.name) existingAgreement.name = body.name;
        if (body.description) existingAgreement.description = body.description;
        if (body.benefit) existingAgreement.benefit = body.benefit;
        if (body.region) existingAgreement.region = body.region;
        if (body.commune) existingAgreement.commune = body.commune;
        if (body.exclusiveSeniors !== undefined) existingAgreement.exclusiveSeniors = body.exclusiveSeniors;
        if (body.exclusivePregnant !== undefined) existingAgreement.exclusivePregnant = body.exclusivePregnant;
        if (body.exclusiveDisability !== undefined) existingAgreement.exclusiveDisability = body.exclusiveDisability;
        
        // Guardar el convenio actualizado
        const updatedAgreement = await existingAgreement.save();

        // Responder con el convenio actualizado
        respondSuccess(req, res, 200, updatedAgreement);
    } catch (error) {
        handleError(error, "agreement.controller -> updateAgreement");
        respondError(req, res, 400, error.message);
    }
}

// async function updateAgreement(req, res) {
//     try {
//         const { params, body } = req;
//         const { error: paramsError } = agreementIdSchema.validate(params);
//         if (paramsError) return respondError(req, res, 400, paramsError.message);

//         const { error: bodyError } = agreementBodySchema.validate(body);
//         if (bodyError) return respondError(req, res, 400, bodyError.message);

//         const [agreement, errorAgreement] = await AgreementService.updateAgreementById(params.id, body);
//         if (errorAgreement) return respondError(req, res, 404, errorAgreement);

//         respondSuccess(req, res, 200, agreement);
//     } catch (error) {
//         handleError(error, "agreement.controller -> updateAgreement");
//         respondError(req, res, 400, error.message);
//     }
// }

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

    const [agreement, errorAgreement] =
      await AgreementService.deleteAgreementById(params.id);
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
