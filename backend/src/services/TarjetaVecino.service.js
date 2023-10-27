"use strict";
// Importa el modelo de datos 'TarjetaV'
const TarjetaV = require("../models/TarjetaVecino.model.js");
const { handleError } = require("../utils/errorHandler");

/**
 * Obtiene todos los usuarios de la base de datos
 * @returns {Promise} Promesa con el objeto de los usuarios
 */
async function getTarjetas() {
  try {
    const TARJETAS = await TarjetaV.find().exec();

    if (!TARJETAS) return [null, "No hay tarjetas registradas"];

    return [TARJETAS, null];
  } catch (error) {
    handleError(error, "tarjeta.service -> getTarjetas");
  }
}
/** 
/**
 * Crea un nuevo usuario en la base de datos
 * @param {Object} tarjeta Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario creado
 */
/** async function createTarjetaV(tarjeta) {
  try {
    const { TarjetaVname, email, password, roles } = tarjeta;

    const TarjetaVFound = await TarjetaV.findOne({ email: tarjeta.email });
    if (TarjetaVFound) return [null, "El usuario ya existe"];

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];
    const myRole = rolesFound.map((role) => role._id);

    const newTarjetaV = new TarjetaV({
      TarjetaVname,
      email,
      password: await TarjetaV.encryptPassword(password),
      roles: myRole,
    });
    await newTarjetaV.save();

    return [newTarjetaV, null];
  } catch (error) {
    handleError(error, "tarjeta.service -> createTarjetaV");
  }
}

/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
/** async function getTarjetaVById(id) {
  try {
    const tarjeta = await TarjetaV.findById({ _id: id })
      .select("-password")
      .populate("roles")
      .exec();

    if (!tarjeta) return [null, "El usuario no existe"];

    return [tarjeta, null];
  } catch (error) {
    handleError(error, "tarjeta.service -> getTarjetaVById");
  }
}

/**
 * Actualiza un usuario por su id en la base de datos
 * @param {string} id Id del usuario
 * @param {Object} tarjeta Objeto de usuario
 * @returns {Promise} Promesa con el objeto de usuario actualizado
 */
/** async function updateTarjetaV(id, tarjeta) {
  try {
    const TarjetaVFound = await TarjetaV.findById(id);
    if (!TarjetaVFound) return [null, "El usuario no existe"];

    const { TarjetaVname, email, password, newPassword, roles } = tarjeta;

    const matchPassword = await TarjetaV.comparePassword(
      password,
      TarjetaVFound.password,
    );

    if (!matchPassword) {
      return [null, "La contraseña no coincide"];
    }

    const rolesFound = await Role.find({ name: { $in: roles } });
    if (rolesFound.length === 0) return [null, "El rol no existe"];

    const myRole = rolesFound.map((role) => role._id);

    const TarjetaVUpdated = await TarjetaV.findByIdAndUpdate(
      id,
      {
        TarjetaVname,
        email,
        password: await TarjetaV.encryptPassword(newPassword || password),
        roles: myRole,
      },
      { new: true },
    );

    return [TarjetaVUpdated, null];
  } catch (error) {
    handleError(error, "tarjeta.service -> updateTarjetaV");
  }
}

/**
 * Elimina un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario eliminado
 */
/** async function deleteTarjetaV(id) {
  try {
    return await TarjetaV.findByIdAndDelete(id);
  } catch (error) {
    handleError(error, "tarjeta.service -> deleteTarjetaV");
  }
}
*/
module.exports = {
  getTarjetas,
  /** createTarjetaV,
  getTarjetaVById,
  updateTarjetaV,
  deleteTarjetaV, */
};
