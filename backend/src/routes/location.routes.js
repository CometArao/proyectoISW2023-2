"use strict";

const express = require("express");

const {
    getRegions,
    getCommunes,
    getLocationById,
    getCommunesForRegion,
    // getRegionById,
    // getCommuneById,
} = require("../controllers/location.controller.js");

const router = express.Router();

// Ruta para obtener todas las regiones
router.get("/regiones", getRegions);

// Ruta para obtener todas las comunas
router.get("/comunas", getCommunes);

router.get("/:id", getLocationById);

router.get("/comunas/:id", getCommunesForRegion);
// // Ruta para obtener el nombre de una región por su ID
// router.get("/regionID/:regionId", getRegionById);

// // Ruta para obtener el nombre de una comuna por su ID
// router.get("/communeID/:communeId", getCommuneById);

module.exports = router;
