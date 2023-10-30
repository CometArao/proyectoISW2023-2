"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");

// Importa el middleware de autorización 
const { isAdmin } = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const verifyJWT= require("../middlewares/authentication.middleware.js");
/** Middleware multer */
const upload = require("../config/configMulter.js");
/** Middleware para validar la edad */
const ageValidation = require("../middlewares/ageValidation.middleware.js");
// Importa el middleware de validación de campos
const { validarCamposRequeridos, 
    verificarFormatoCorreo } = require("../middlewares/clienteValidations.middleware.js");

/** Controlador de clientes */
const clienteController = require("../controllers/client.controller.js");

const validateRut = require("../middlewares/rutValidation.middleware.js");

/** Instancia del encrutador */
const router = express.Router();
// Accesible  por usuarios
router.post("/",
  upload.any(), // Este middleware manejará la subida de archivos después de todas las validaciones
 (req, res, next) => {
   if (req.files && req.files.length > 0) {
     next();
   } else {
    res.status(400).json({ success: false, message: "Error al subir el archivo" }); 
   }
 },
 validarCamposRequeridos,
 validateRut,
 ageValidation, 
 verificarFormatoCorreo, 
 clienteController.createCliente,
);
  
  // Accesible solo por administradoresrouter.get("/", isAdmin, clienteController.getClientes);
  // Accesible solo por administradores
router.use(verifyJWT);
router.get("/", isAdmin, clienteController.getClientes);
router.get("/:id", isAdmin, clienteController.getClientesById);
 router.put("/:id", isAdmin, clienteController.updateClientesById);
router.delete("/:id", isAdmin, clienteController.deleteClientesById);

// Exporta el enrutador
module.exports = router;
