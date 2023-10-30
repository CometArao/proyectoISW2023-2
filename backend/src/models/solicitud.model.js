"use strict";
const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema({
  Cliente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "cliente",
    required: true,
  },

  Fecha: {
    type: String,
    required: true,
  },
  Estado: {
    type: String,
    enum: ["Aceptado", "Rechazado", "Pendiente", "Derivado"],
    default: "Pendiente",
    required: true,
  },
});
solicitudSchema.set("strictPopulate", false);
module.exports = mongoose.model("Solicitud", solicitudSchema);
