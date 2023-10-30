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
async function createClientes(clienteData) {
  try {
    const { 
      Nombres,
       ApellidoPaterno,
        ApellidoMaterno,
         Rut,
          FechaDeNacimiento,
          Correo,
           Dirección,
            Comuna,
             Region,
              Discapacidad,
               AdultoMayor,
                Embarazada } = clienteData;
    const clienteEncontrado = await cliente.findOne({ Rut: Rut });
    if (clienteEncontrado) return [null, "El cliente ya habia solicitado antes"];
    const nuevoCliente = new cliente({
      Nombres,
      ApellidoPaterno,
      ApellidoMaterno,
      Rut,
      FechaDeNacimiento,
      Correo,
      Dirección,
      Comuna,
      Region,
      Discapacidad,
      AdultoMayor,
      Embarazada,
    });

    await nuevoCliente.save();

    return [nuevoCliente, null];
  } catch (error) {
    handleError(error, "cliente.service -> createCliente");
  }
}
/**
 * Obtiene un cliente por su ID
 * @param {string} Id del cliente
 * @returns {Promise}Promesa con el objeto de cliente
 */
async function getClientesById(id) {
  try {
    const clientes = await cliente.findOne({ _id: id });

    if (!clientes) return [null, "El cliente no existe"];

    return [clientes, null];
  } catch (error) {
    handleError(error, "cliente.service -> getClienteByRut");
  }
}
/**
 * Actualiza un cliente por su id
 * @param {string} Id  del cliente
 * @param {object} cliente objeto de cliente
 * @returns {promisse} promesa con el objeto de cliente actualizado
 **/
async function updateClientesById(id, clienteNuevo) {
  try {
    const clienteActual = await cliente.findOneAndUpdate(
      { _id: id },
      clienteNuevo,
      { new: true },
    );
    if (!clienteActual) return [null, "El cliente no existe"];
    return [clienteActual, null];
  } catch (error) {
    handleError(error, "cliente.service -> updateClienteByRut");
  }
}
/**
 * Elimina un cliente por su id
 * @param {string} Id  del cliente
 * @returns {Promise} promesa con el objeto de cliente eliminado
 **/
async function deleteClientesById(id) {
  try {
    const clienteEliminado = await cliente.findOneAndDelete({ _id: id });
    if (!clienteEliminado) return [null, "El cliente no existe"];
    return [clienteEliminado, null];
  } catch (error) {
    handleError(error, "cliente.service -> deleteCliente");
  }
}

module.exports = {
  getClientes,
  createClientes,
  getClientesById,
  updateClientesById,
  deleteClientesById,
};
