"use strict";

const Joi = require("joi");
const { Commune, Region } = require("../models/location.model");

const customValidateCommunes = async (value, helpers) => {
    try {
        // Obtiene el objeto de la región asociada al convenio
        const region = await helpers.state.ancestors[0].region;

        if (!region) {
            return value;
        }

        // Comprueba que la comuna pertenezca a la región
        const commune = await Commune.findOne({ _id: value, region: region });

        if (!commune) {
            return helpers.error("any.invalid");
        }
    } catch (err) {
        console.error(err);
        return helpers.error("any.invalid");
    }
};

const customValidateRegions = async (value, helpers) => {
    try {
        // Intenta encontrar una región con el _id proporcionado
        const region = await Region.findOne({ _id: value });

        if (!region) {
            return helpers.error("any.invalid");
        }
    } catch (error) {
        console.error(error);
        return helpers.error("any.invalid");
    }
};

/**
 * Esquema de validación para el cuerpo la creación de convenio.
 * @constant {Object}
 */
const agreementBodySchema = Joi.object({
    name: Joi.string().min(2).max(100).required().messages({
        "string.empty": "El nombre no puede estar vacío.",
        "any.required": "El nombre es obligatorio.",
        "string.base": "El nombre debe ser de tipo string.",
        "string.min": "El nombre debe tener al menos {#limit} caracteres.",
        "string.max": "El nombre debe tener un máximo de {#limit} caracteres.",
    }),
    description: Joi.string().min(10).max(500).required().messages({
        "string.empty": "La descripción no puede estar vacía.",
        "any.required": "La descripción es obligatoria.",
        "string.base": "La descripción debe ser de tipo string.",
        "string.min": "La descripción debe tener al menos {#limit} caracteres.",
        "string.max": "La descripción debe tener un máximo de {#limit} caracteres.",
    }),
    image: Joi.string().messages({
        "string.empty": "La imagen no puede estar vacía.",
        "string.base": "La imagen debe ser de tipo string.",
    }),
    benefit: Joi.string().required().messages({
        "string.empty": "El beneficio no puede estar vacío.",
        "any.required": "El beneficio es obligatorio.",
        "string.base": "El beneficio debe ser de tipo string.",
    }),
    region: Joi.string().required().custom(customValidateRegions).messages({
        "string.empty": "La región no puede estar vacía.",
        "any.required": "La región es obligatoria.",
        "any.invalid": "La región no existe.",
    }),
    commune: Joi.string().required().custom(customValidateCommunes).messages({
        "string.empty": "La comuna no puede estar vacía.",
        "any.required": "La comuna es obligatoria.",
        "any.invalid": "La comuna no pertenece a la región seleccionada.",
    }),
    exclusiveSeniors: Joi.boolean().messages({
        "boolean.base": "El campo debe ser de tipo boolean.",
    }),
    exclusivePregnant: Joi.boolean().messages({
        "boolean.base": "El campo debe ser de tipo boolean.",
    }),
    exclusiveDisability: Joi.boolean().messages({
        "boolean.base": "El campo debe ser de tipo boolean.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

/**
 * Esquema de validación para el id de convenio.
 * @constant {Object}
 */

const agreementIdSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.empty": "El id no puede estar vacío.",
        "any.required": "El id es obligatorio.",
        "string.base": "El id debe ser de tipo string.",
    }),
}).messages({
    "object.unknown": "No se permiten propiedades adicionales.",
});

module.exports = {  agreementBodySchema, agreementIdSchema };