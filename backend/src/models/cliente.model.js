"use strict";
const mongoose = require("mongoose");

// creación de esquema de la colección clientes
const clienteShema = new mongoose.Schema({
  Nombres: {
    type: String,
    required: true,
  },
  ApellidoPaterno: {
    type: String,
    required: true,
  },
  ApellidoMaterno: {
    type: String,
    required: true,
  },
  Rut: {
    type: String,
    unique: true,
    required: true,
  },
  FechaDeNacimiento: {
    type: String,
    required: true,
  },
  Correo: {
    type: String,
    required: true,
  },
  Dirección: {
    type: String,
    required: true,
  },
  Comuna: {
    type: String,
    ref: "Commune",
    required: true,
  },
  Region: {
    type: String,
    required: true,
  },
  Discapacidad: {
    type: Boolean,
    default: false,
    required: true,
  },
  AdultoMayor: {
    type: Boolean,
    default: false,
    required: true,
  },
   Embarazada: {
    type: Boolean,
    default: false,
    required: true,
   },

});
// Modelo de dstos 'cliente'
const cliente = mongoose.model("cliente", clienteShema);
// Ecportación del modelo de datos 'cliente'
module.exports = cliente;
