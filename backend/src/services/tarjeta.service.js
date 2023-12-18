"use strict";

const Tarjeta = require("../models/tarjeta.model");
const { handleError } = require("../utils/errorHandler");


// src/services/tarjetaService.js
/**
 * Obtiene las tarjetas con prioridad.
 * @returns {Promise<Array>} Un array con las tarjetas ordenadas por prioridad.
 */
async function obtenerTarjetasConPrioridad() {
  return Tarjeta.find().sort({ "fechaEmision": -1, "AdultoMayor": -1, "Embarazada": -1 });
};

/**
 * Crea una nueva tarjeta.
 * @param {Object} nuevaTarjeta - La nueva tarjeta a crear.
 * @returns {Promise<Object>} La nueva tarjeta creada.
 */
async function crearTarjeta(nuevaTarjeta) {
  try {
    const tarjeta = new Tarjeta(nuevaTarjeta);
    const nuevaTarjeta = await tarjeta.save();
    return nuevaTarjeta;
  } catch (error) {
    handleError(error, "tarjeta.service -> crearTarjeta");
    throw error;
  }
}

/**
 * Obtiene todas las tarjetas.
 * @returns {Promise<Array>} Un array con todas las tarjetas.
 */
async function obtenerTarjetas() {
  try {
    const tarjetas = await Tarjeta.find();
    return tarjetas;
  } catch (error) {
    handleError(error, "tarjeta.service -> obtenerTarjetas");
    throw error;
  }
}

// Leer una tarjeta por su ID
/**
 * Obtiene una tarjeta por su ID.
 * @param {string} id - El ID de la tarjeta a obtener.
 * @returns {Promise<Object>} La tarjeta obtenida.
 */
async function obtenerTarjetaPorId(id) {
  try {
    const tarjeta = await Tarjeta.findById(id);
    return tarjeta;
  } catch (error) {
    handleError(error, "tarjeta.service -> obtenerTarjetaPorId");
    throw error;
  }
}

/**
 * Actualiza una tarjeta por su ID.
 * @param {string} id - El ID de la tarjeta a actualizar.
 * @param {Object} tarjetaActualizada - La tarjeta actualizada.
 * @returns {Promise<Object>} La tarjeta actualizada.
 */
async function actualizarTarjeta(id, tarjetaActualizada) {
  try {
    const tarjetaActualizada = await Tarjeta.findByIdAndUpdate(
      id,
      tarjetaActualizada,
      { new: true },
    );
    return tarjetaActualizada;
  } catch (error) {
    handleError(error, "tarjeta.service -> actualizarTarjeta");
    throw error;
  }
}

/*
 * Elimina una tarjeta por su ID.
 * @param {string} id - El ID de la tarjeta a eliminar.
 * @returns {Promise<Object>} La tarjeta eliminada.
 */
/**
 * Elimina una tarjeta por su ID.
 * @param {string} id - El ID de la tarjeta a eliminar.
 * @returns {Promise<Object>} La tarjeta eliminada.
 */
async function eliminarTarjeta(id) {
  try {
    const tarjetaEliminada = await Tarjeta.findByIdAndRemove(id);
    return tarjetaEliminada;
  } catch (error) {
    handleError(error, "tarjeta.service -> eliminarTarjeta");
    throw error;
  }
}

module.exports = {
  priorizarSolicitudes,

obtenerTarjetasConPrioridad,

  crearTarjeta,
  obtenerTarjetas,
  obtenerTarjetaPorId,
  actualizarTarjeta,
  eliminarTarjeta,
};
