"use strict";

// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el middleware de autorización
const {isAdmin} = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const verifyJWT = require("../middlewares/authentication.middleware.js");

const {
  getAgreements,
  getAgreementById,
  getAgreementsByRegion,
  getAgreementsByRegionAndCommune,
  createAgreement,
  updateAgreement,
  deleteAgreement,
} = require("../controllers/agreement.controller");

const router = express.Router();

// accesibles por todos los usuarios
router.get("/", getAgreements);
router.get("/:id", getAgreementById);
router.get("/region/:region", getAgreementsByRegion);
router.get("/region/:region/comuna/:commune", getAgreementsByRegionAndCommune);

router.use(verifyJWT);
// accesibles solo por administradores
router.post("/", isAdmin, createAgreement);
router.put("/:id", isAdmin, updateAgreement);
router.delete("/:id", isAdmin, deleteAgreement);

module.exports = router;
