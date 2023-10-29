"use strict";

const { validate, clean } = require("rut.js");

module.exports = (req, res, next) => {
    const rut = req.body.Rut;
    // Limpia el RUT y verifica si es válido
    if (!validate(clean(rut))) {
        return res.status(400).json({ 
            message: "El RUT proporcionado no es válido.",
        });
    }
    next();
};
