"use strict";
const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
    Cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "cliente",
        required: true,
    },

    Fecha_de_solicitud: {
        type: String,
        required: true,
    },
    Estado_Solicitud: {
        type: String,
        enum: ["Aceptado", "Rechazado", "Pendiente", "Derivado"],
        default: "Pendiente",
        required: true,
    },
    // Se agrega el motivoRechazo para argumentarle la razón por la que fue rechazada su solicitud.
    MotivoRechazo: {
        type: String,
        required: false,
    },
    });
module.exports = mongoose.model("Solicitud", solicitudSchema);
