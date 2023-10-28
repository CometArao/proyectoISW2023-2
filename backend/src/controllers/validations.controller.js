"use strict";

const ageValidation = require("../middlewares/ageValidation.middleware");
const rutValidation = require("../middlewares/rutValidation.middleware");
const { respondSuccess, respondError } = require("../utils/resHandler.js");

const validacionSolicitud = require("../services/validations.service.js");
// Se deben importar otros middlewares de validación

exports.validateClient = (req, res, next) => {
    // Validación de edad
    ageValidation(req, res, (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    // Validación de RUT
    rutValidation(req, res, (error) => {
        if (error) {
            return res.status(400).json({ message: error.message });
        }
    });

    // Se deben agregar otras validaciones
    
    // como guardar el cliente en la base de datos, enviar una respuesta positiva, etc.
    res.status(200).json({ message: "Validaciones completadas exitosamente." });

    if (algunaCondicionDeRechazo) {
        req.body.Estado_Solicitud = "Rechazada";
        req.body.Motivo_Rechazo = "Motivo del rechazo aquí";
    } else if (algunaCondicionDeDerivada) {
        req.body.Estado_Solicitud = "Derivada";
    } else {
        req.body.Estado_Solicitud = "Aceptada";
    }

    if (req.body.Estado_Solicitud === "Rechazada") {
        return res.status(400).json({
            message: "Solicitud rechazada",
            reason: req.body.Motivo_Rechazo,
        });
    } else if (req.body.Estado_Solicitud === "Derivada") {
        // Aquí, podrías, por ejemplo, enviar un correo electrónico al administrador
    } else {
        return res.status(200).json({
            message: "Solicitud aceptada",
        });
    }
    };

