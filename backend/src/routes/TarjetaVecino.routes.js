"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

/** Controlador de TARJETA VECINO */
const tarjetaController = require("../controllers/TarjetaVecino.controller.js");

/** Middlewares de autorización */
// const authorizationMiddleware = require("../middlewares/authorization.middleware.js");

/** Middleware de autenticación */
// const authenticationMiddleware = require("../middlewares/authentication.middleware.js");

/** Instancia del enrutador */
const router = express.Router();

// Define el middleware de autenticación para todas las rutas
// router.use(authenticationMiddleware);

// Define las rutas para los usuarios
router.get("/", tarjetaController.gettarjetavecinos);
/** router.post("/", authorizationMiddleware.isAdmin, usuarioController.createUser);
router.get("/:id", tarjetaController.getUserById);
router.put(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.updateUser,
);
router.delete(
  "/:id",
  authorizationMiddleware.isAdmin,
  usuarioController.deleteUser,
); */

// Exporta el enrutador
module.exports = router;
