"use strict";
const { respondSuccess, respondError } = require("../utils/resHandler");
const clienteService = require("../services/client.service.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Crea un nuevo cliente
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createCliente(req, res) {
  try {
    const { body } = req;

    // Convertir la fecha de nacimiento de formato DD/MM/YYYY a objeto Date
    const parts = body.FechaDeNacimiento.split("/");
    const convertedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    body.FechaDeNacimiento = convertedDate;
    const [newCliente, clienteError] =
      await clienteService.createClientes(body);
    if (clienteError) return respondError(req, res, 400, clienteError);
    if (!newCliente) {
      return respondError(req, res, 400, "No se creo el cliente");
    }
    respondSuccess(req, res, 201, newCliente);
  } catch (error) {
    handleError(error, "cliente.controller -> createCliente");
    respondError(req, res, 500, "No se creo el cliente");
  }
}
/**
 * Obtiene un cliente por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getClientesById(req, res) {
  try {
    const { params } = req;
    const [cliente, errorCliente] = await clienteService.getClientesById(
      params.id,
    );
    if (errorCliente) return respondError(req, res, 404, errorCliente);
    respondSuccess(req, res, 200, cliente);
  } catch (error) {
    handleError(error, "cliente.controller -> getClienteById");
    respondError(req, res, 500, "No se obtuvo el cliente");
  }
}
/**
 * Obtiene todos los clientes
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getClientes(req, res) {
  try {
    const [clientes, errorClientes] = await clienteService.getClientes();
    if (errorClientes) return respondError(req, res, 404, errorClientes);

    clientes.length === 0
      ? respondSuccess(req, res, 204)
      : respondSuccess(req, res, 200, clientes);
  } catch (error) {
    handleError(error, "cliente.controller -> getClientes");
    respondError(req, res, 400, error.message);
  }
}
/**
 * Actualiza un cliente por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function updateClientesById(req, res) {
  try {
    const { params, body } = req;
    const [cliente, clienteError] = await clienteService.updateClientesById(
      params.Rut,
      body,
    );
    if (clienteError) return respondError(req, res, 404, clienteError);
    respondSuccess(req, res, 200, cliente);
  } catch (error) {
    handleError(error, "cliente.controller -> updateCliente");
    respondError(req, res, 500, "No se actualizo el cliente");
  }
}
/**
 * Elimina un cliente por su rut
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function deleteClientesById(req, res) {
  try {
    const { params } = req;
    const [cliente, clienteError] = await clienteService.deleteClientesById(
      params.Rut,
    );
    if (clienteError) return respondError(req, res, 404, clienteError);
    respondSuccess(req, res, 200, cliente);
  } catch (error) {
    handleError(error, "cliente.controller -> deleteCliente");
    respondError(req, res, 500, "No se elimino el cliente");
  }
}

module.exports = {
  createCliente,
  getClientes,
  getClientesById,
  updateClientesById,
  deleteClientesById,
};
