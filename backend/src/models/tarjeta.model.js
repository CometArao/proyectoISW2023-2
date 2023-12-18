const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema({
  rut: {
    type: String,
    unique: true,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  fechaEmision: {
    type: Date,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
  // Añade los siguientes campos:
  estado: {
    type: String,
    enum: ["activa", "bloqueada", "vencida"],
    default: "activa",
  },
  comuna: {
    type: String,
    required: true,
  },
});

const Tarjeta = mongoose.model("Tarjeta", tarjetaSchema);

module.exports = Tarjeta;
