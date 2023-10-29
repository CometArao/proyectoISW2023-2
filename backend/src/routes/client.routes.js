"use strict";
// Importa el modulo 'express' para crear las rutas
const express = require("express");
// Importa el middleware de autorización 
const { isAdmin } = require("../middlewares/authorization.middleware.js");
// Importa el middleware de autenticación
const verifyJWT= require("../middlewares/authentication.middleware.js");
/** Middleware multer */
const upload = require("../config/configMulter.js");
const ageValidation = require("../middlewares/ageValidation.middleware.js");
/** Controlador de clientes */
const clienteController = require("../controllers/client.controller.js");

const validateRut = require("../middlewares/rutValidation.middleware.js");
/** Instancia del encrutador */
const router = express.Router();
// Accesible  por usuarios
router.post("/", clienteController.createCliente);

// define ruta para subir archivos
router.post("/upload", upload.single("pdf"), (req, res) => {
    if (req.file) {
      res.json({
        success: true,
        file: req.file.filename,
      });
    } else {
      res.status(400).json({ success: false, message: "Error al subir el archivo" });
    }
  });
  
  // Accesible solo por administradoresrouter.get("/", isAdmin, clienteController.getClientes);
  // Accesible solo por administradores
  router.post("/", ageValidation, validateRut, clienteController.createCliente);
  router.use(verifyJWT);
router.post("/", isAdmin, clienteController.createCliente);
router.use(verifyJWT);
router.get("/", isAdmin, clienteController.getClientes);
router.get("/:id", isAdmin, clienteController.getClientesById);
 router.put("/:id", isAdmin, clienteController.updateClientesById);
router.delete("/:id", isAdmin, clienteController.deleteClientesById);

// Exporta el enrutador
module.exports = router;
