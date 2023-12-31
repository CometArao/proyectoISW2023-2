"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Enrutador de usuarios  */
const userRoutes = require("./user.routes.js");

const TarjetaVecinoRoutes = require("./tarjeta.routes.js");

/** Enrutador de autenticación */
const authRoutes = require("./auth.routes.js");

/** Middleware de autenticación */
const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Encrutador de solicitudes */
const solicitudRoutes = require("./solicitud.routes.js");

/** Encrutador de clientes */
const clienteRoutes = require("./client.routes.js");

/** Encrutador de ubicaciones */
const locationRoutes = require("./location.routes.js");

/** Instancia del enrutador */
const router = express.Router();

// Define las rutas para los usuarios /api/usuarios
router.use("/users", authenticationMiddleware, userRoutes);
// Define las rutas para la autenticación /api/auth
router.use("/auth", authRoutes);

router.use("/tarjetavecino", TarjetaVecinoRoutes);

// Define las rutas para las solicitudes /api/solicitudes
router.use("/solicitudes", solicitudRoutes);
// Define las rutas para los clientes /api/clientes
router.use("/clientes", clienteRoutes);

// Define las rutas para las ubicaciones /api/ubicaciones
router.use("/ubicaciones", locationRoutes);


// Exporta el enrutador
module.exports = router;
