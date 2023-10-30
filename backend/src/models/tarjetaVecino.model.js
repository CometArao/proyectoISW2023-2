"use strict";

const mongoose = require("mongoose");

const tarjetaVecinoSchema = new mongoose.Schema({
    Solicitud: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Solicitud",
        required: true,
    },
    Cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true,
    },
    FechaEmision: {
        type: Date,
        default: Date.now,
        required: true,
    },
    Estado: {
        type: String,
        enum: ["Aceptada", "Rechazada", "Derivada"],
        required: true,
    },
    MotivoRechazo: {
        type: String,
        required: false,
    },
});

module.exports = mongoose.model("TarjetaVecino", tarjetaVecinoSchema);
