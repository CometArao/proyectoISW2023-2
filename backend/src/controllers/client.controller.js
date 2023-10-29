"use strict";
// const axios = require("axios");
// const { API_KEY } = require("../config/configEnv.js");
const { validationResult, check } = require("express-validator");
const { respondSuccess, respondError } = require("../utils/resHandler.js");
const clienteService = require("../services/client.service.js");
const { handleError } = require("../utils/errorHandler.js");

/**
 * Crea un nuevo cliente
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function createCliente(req, res) {
  try {
    const { body } = req;
    // Validaciones 
  
 // Validación para Correo
    check(req.Correo, "Formato de correo electrónico no válido").isEmail();
 
    // Validación de dirección con Google Maps Geocoding API.
        // Si la dirección es válida, puedes continuar con la creación del cliente.
   // const direccionValida = await verificarDireccionEnGoogleMaps(body.Dirección);

// Si la dirección no es válida, puedes agregar un error a las validaciones.

   // if (!direccionValida) {
    //  return respondError(req, res, 400, "La dirección proporcionada no es válida.");
   // }
    
    // Validación para campos obligatorios.
const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return respondError(req, res, 400, errors.array());
    }
    if (
 
      !body.Nombres ||
      !body.ApellidoPaterno ||
     !body.ApellidoMaterno ||
      !body.Rut ||
      !body.Correo
       // Agregar más campos requeridos según tu modelo.
    ) {
      return respondError(req, res, 400, "Todos los campos son obligatorios");
    }
     // Validación para formato de documentos en PDF.
    // Debes verificar que los documentos sean PDF por separado. 
    // Puedes utilizar la extensión del archivo para hacer esta validación.

      // Validación para una sola solicitud a la vez.
    // Aquí debes implementar lógica adicional para verificar si el usuario ya tiene una solicitud activa.



    // Convertir la fecha de nacimiento de formato DD/MM/YYYY a objeto Date
    const parts = body.FechaDeNacimiento.split("/");
    const convertedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    body.FechaDeNacimiento = convertedDate;

  // Resto del código para la creación del cliente.
   const [newCliente, clienteError] = await clienteService.createClientes(body);
    if (clienteError) return respondError(req, res, 400, clienteError);
      if (!newCliente) {
        return respondError(req, res, 400, "No se creo el cliente");
      }
      respondSuccess(req, res, 201, newCliente);
    } catch (error) {
      handleError(error, "client.controller -> createCliente");
      respondError(req, res, 500, "No se creo el cliente");
    }
}
// Aquí debes realizar una verificación con Google Maps o una API de geocodificación.
// eslint-disable-next-line require-jsdoc
/* async function verificarDireccionEnGoogleMaps(direccion) {
  try {
    // eslint-disable-next-line max-len, no-unused-vars
    const apiKey =API_KEY; // Reemplaza con tu clave de API de Google Maps.
    // eslint-disable-next-line no-unused-vars
    const direccionEncoded = encodeURIComponent(direccion);
    // eslint-disable-next-line max-len
    const url = "https://maps.googleapis.com/maps/api/geocode/json?address=${direccionEncoded}&key=${apiKey}";

    const response = await axios(url);
    if (response.status === 200) {
    const data = response.json();

    if (data.status === "OK" && data.results.length > 0) {
      // Si la API de Google Maps devuelve un resultado válido, consideramos la dirección válida.
      return true;
    }
  }

    return false;
  } catch (error) {
    handleError(error, "client.controller -> verificarDireccionEnGoogleMaps");
    return false;
  }
} */  

/**
 * Obtiene un cliente por su id
 * @param {Object} req - Objeto de petición
 * @param {Object} res - Objeto de respuesta
 */
async function getClientesById(req, res) {
  try {
    const { params } = req;
    const [cliente, errorCliente] = await clienteService.getClientesById(params.Rut);
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
      const [cliente, clienteError] = await clienteService.updateClientesById(params.Rut, body);
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
      const [cliente, clienteError] = await clienteService.deleteClientesById(params.Rut);
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

