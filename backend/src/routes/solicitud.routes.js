"use strict";
// Importa el modulo 'express' para crear las rutas
 const express = require("express");
 const { isAdmin } = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const authentication= require("../middlewares/authentication.middleware.js");
/** Controlador de solicitudes */
const solicitudController = require("../controllers/solicitud.controller.js");
/** Instancia del encrutador */
const router = express.Router(authentication);

// Define las rutas para  solicitudes que solo ven los usuarios
router.get("/", solicitudController.getSolicitudes);
router.post("/", solicitudController.createSolicitud);
// Rutas para administrador
router.get("/:id", isAdmin, solicitudController.getSolicitudById);
router.put("/:id", isAdmin, solicitudController.updateEstado);
router.delete("/:id", isAdmin, solicitudController.deleteSolicitud);

// Exporta el enrutador
module.exports = router;
