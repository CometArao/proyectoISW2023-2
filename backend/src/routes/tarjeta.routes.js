const express = require("express");
const router = express.Router();
const tarjetaController = require("../controllers/tarjeta.controller");
const authenticationMiddleware = require("../middlewares/authentication.middleware");
const authorizationMiddleware = require("../middlewares/authorization.middleware");

const validarTarjeta = require("../middlewares/validationMiddleware");



// Ruta para que el administrador genere un listado de Tarjetas Vecino con prioridad
router.get(
  "/generar-listado-prioridad",
  authenticationMiddleware,
  authorizationMiddleware.isAdmin,
  tarjetaController.generarListadoPrioridad,
);

// Ruta para notificar a los usuarios sobre la emisión exitosa de sus Tarjetas Vecino
router.post(
  "/notificar-usuarios",
  authenticationMiddleware,
  authorizationMiddleware.isAdmin,
  tarjetaController.notificarUsuariosTarjetasEmitidas,
);

// Rutas para CRUD de Tarjetas Vecino
router.post(
  "/tarjetas",
  authenticationMiddleware,

  validarTarjeta,

  tarjetaController.crearTarjeta,
);
router.get(
  "/tarjetas",
  authenticationMiddleware,
  tarjetaController.obtenerTarjetas,
);
router.get(
  "/tarjetas/:id",
  authenticationMiddleware,
  tarjetaController.obtenerTarjetaPorId,
);
router.put(
  "/tarjetas/:id",
  authenticationMiddleware,
  tarjetaController.actualizarTarjeta,
);
router.delete(
  "/tarjetas/:id",
  authenticationMiddleware,
  tarjetaController.eliminarTarjeta,
);

module.exports = router;
