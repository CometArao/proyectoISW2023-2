"use strict";
const cliente = require("../models/cliente.model.js");
const { handleError } = require("../utils/errorHandler.js");
/**
 * Obtiene a todos los clientes de la base de datos
 * @returns {Promise} promesa con el objeto de clientes
 */
async function getClientes() {
  try {
    const clientes = await cliente.find();

    if (!clientes) return [null, "No hay solicitudes"];
    return [clientes, null];
  } catch (error) {
    handleError(error, "cliente.service -> getClientes");
  }
}
/**
 * creación de un nuevo cliente en la base de datos
 * @param {object} cliente  objeto de cliente
 * @returns {Promise} promesa con el objeto de cliente creado
 */
async function createClientes(cliente) {
  try {
    const { Nombres, Apellidos, Rut, Correo, Direccion, Comuna, Region } =
      cliente;
    const clienteEncontrado = await cliente.findOne({ Rut: cliente.Rut });
    if (clienteEncontrado) return [null, "El cliente ya habia solicitado antes"];
    const nuevoCliente = new cliente({
      Nombres,
      Apellidos,
      Rut,
      Correo,
      Direccion,
      Comuna,
      Region,
    });

    await nuevoCliente.save();

    return [nuevoCLiente, null];
  } catch (error) {
    handleError(error, "cliente.service -> createCliente");
  }
}
/**
 * Obtiene un cliente por su rut
 * @returns {Promise}Promesa con el objeto de cliente
 */
async function getClientesByRut(Rut) {
  try {
    const cliente = await cliente.findOne({ Rut: cliente.Rut });

    if (!cliente) return [null, "El cliente no existe"];

    return [cliente, null];
  } catch (error) {
    handleError(error, "cliente.service -> getClienteByRut");
  }
}
/**
 * Actualiza un cliente por su rut
 * @param {string} Rut rut del cliente
 * @param {object} cliente objeto de cliente
 * @returns {promisse} promesa con el objeto de cliente actualizado
 **/
async function updateClientesByRut(Rut) {
  try {
    const cliente = await cliente.findOneAndUpdate(
      { Rut: cliente.Rut },
      cliente,
      { new: true },
    );
    if (!cliente) return [null, "El cliente no existe"];
    return [cliente, null];
  } catch (error) {
    handleError(error, "cliente.service -> updateClienteByRut");
  }
}
/**
 * Elimina un cliente por su rut
 * @param {string} Rut rut del cliente
 * @returns {Promise} promesa con el objeto de cliente eliminado
 **/
async function deleteClientes(Rut) {
  try {
    const cliente = await cliente.findOneAndDelete({ Rut: cliente.Rut });
    if (!cliente) return [null, "El cliente no existe"];
    return [cliente, null];
  } catch (error) {
    handleError(error, "cliente.service -> deleteCliente");
  }
}

module.exports = {
  getClientes,
  createClientes,
  getClientesByRut,
  updateClientesByRut,
  deleteClientes,
};
