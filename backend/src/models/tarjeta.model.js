const mongoose = require("mongoose");

const tarjetaSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Esto hace referencia al modelo de usuarios si estás utilizando MongoDB
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  comuna: {
    type: String,
    required: true,
  },
  rut: {
    type: String,
    required: true,
  },
  fechaVencimiento: {
    type: Date,
    required: true,
  },
  estado: {
    type: String,
    enum: ["activa", "bloqueada", "vencida"],
    default: "activa",
  },
});

const Tarjeta = mongoose.model("Tarjeta", tarjetaSchema);

module.exports = Tarjeta;
