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

    });
module.exports = mongoose.model("Solicitud", solicitudSchema);
