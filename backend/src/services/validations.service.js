"use strict";

const Solicitud = require("../models/solicitud.model.js");
const User = require("../models/user.model.js");
const Role = require("../models/role.model.js");
const { handleError } = require("../utils/errorHandler.js");

const ageValidation = require("../middlewares/ageValidation.middleware");


/**
 * Obtiene un usuario por su id de la base de datos
 * @param {string} Id del usuario
 * @returns {Promise} Promesa con el objeto de usuario
 */
async function evaluarSolicitud(id) {
    try {
        const solicitud = await Solicitud.findById({ _id: id });
        if (!solicitud) {
            return [null, "Solicitud no encontrada"];
        }

        // Primero se verifica si la solicitud ya fue evaluada
        if (solicitud.Estado_Solicitud !== "Pendiente") {
            return [null, "La solicitud ya fue evaluada o derivada"];
        }

        // Primero se inicia verificando la validación del rut, si no es válido, se rechaza la solicitud
        const cliente = await User.findById({ _id: solicitud.Cliente });

        // 1ra verificación | Rut
        // Verificar formato del RUT
        const pattern = /^[0-9]{1,2}\.[0-9]{3}\.[0-9]{3}-[0-9Kk]{1}$/;
        if (!pattern.test(cliente.Rut)) {
            solicitud.Estado_Solicitud = "Rechazado";
            solicitud.Motivo_Rechazo = "RUT inválido";
            await solicitud.save();
            return [null, "RUT inválido"];
        }

        // Verificar si el rut es real con la librería rut.js
        const rut = require("rut.js");
        if (!rut.validate(cliente.Rut)) {
            solicitud.Estado_Solicitud = "Rechazado";
            solicitud.Motivo_Rechazo = "RUT inválido";
            await solicitud.save();
            return [null, "RUT inválido"];
        }

        // 2da verificación | Edad
        // Verificar si el cliente es mayor de edad
        // Se manda a llamar la función de validación de edad
            
        ageValidation(cliente, null, (error) => {
            if (error) {
                solicitud.Estado_Solicitud = "Rechazado";
                solicitud.Motivo_Rechazo = "El cliente debe ser mayor de edad";
                solicitud.save();
                return [null, "El cliente debe ser mayor de edad"];
            }
        }
        );

        // 4ta verificación | No tener otra tarjeta vecino
        // Se verifica si el cliente ya tiene una tarjeta vecino
        



            
    } catch (error) {
        handleError(error, "validations.service -> evaluarSolicitud");
    }
}

async function enviarNotificacion(correo){
    const mailOptions = {
        from: "municipalidadX@gmail.com",
        to: correo,
        subject: "Solicitud de permiso",
        text: "Su solicitud ha sido aceptada",
    };

}