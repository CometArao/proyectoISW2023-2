"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el middleware de autorización 
const { isAdmin } = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const authentication= require("../middlewares/authentication.middleware.js");
/** Controlador de clientes */
const clienteController = require("../controllers/client.controller.js");
/** Instancia del encrutador */
const router = express.Router(authentication);

// Accesible solo por administradores
 router.get("/", isAdmin, clienteController.getClientes);
router.post("/", isAdmin, clienteController.createCliente);
router.get("/:id", isAdmin, clienteController.getClientesById);
 router.put("/:id", isAdmin, clienteController.updateClientesById);
router.delete("/:id", isAdmin, clienteController.deleteClientesById);

// Exporta el enrutador
module.exports = router;
