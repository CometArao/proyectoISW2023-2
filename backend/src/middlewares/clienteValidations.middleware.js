"use strict";

const ageValidation = require("../middlewares/ageValidation.middleware");

exports.validateAll = (req, res, next) => {
    // ... otras validaciones ...

    // Validación de edad
    ageValidation(req, res, next);

    // ... otras validaciones ...
};
