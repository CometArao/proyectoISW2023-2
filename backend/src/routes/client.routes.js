"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el middleware de autorización 
const { isAdmin } = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const verifyJWT= require("../middlewares/authentication.middleware.js");
const ageValidation = require("../middlewares/ageValidation.middleware.js");
/** Controlador de clientes */
const clienteController = require("../controllers/client.controller.js");

const validateRut = require("../middlewares/rutValidation.middleware.js");
/** Instancia del encrutador */
const router = express.Router();

// Accesible solo por administradores
router.post("/", ageValidation, validateRut, clienteController.createCliente);
router.post("/", isAdmin, clienteController.createCliente);
router.use(verifyJWT);
router.get("/", isAdmin, clienteController.getClientes);
router.get("/:id", isAdmin, clienteController.getClientesById);
 router.put("/:id", isAdmin, clienteController.updateClientesById);
router.delete("/:id", isAdmin, clienteController.deleteClientesById);

// Exporta el enrutador
module.exports = router;
