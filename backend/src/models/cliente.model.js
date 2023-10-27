"use strict";
const mongoose = require("mongoose");

// creación de esquema de la colección clientes
const clienteShema = new mongoose.Schema({
  Nombres: {
    type: String,
    required: true,
  },
  Apellido_Paterno: {
    type: String,
    required: true,
  },
    Apellido_Materno: {
        type: String,
        required: true,
    },
  Rut: {
    type: String,
    required: true,
  },
  Fecha_de_nacimiento: {
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
    type: mongoose.Schema.Types.ObjectId,
    ref: "Commune",
    required: true,
  },
  Region: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Region",
    required: true,
  },
  Discapacidad: {
    type: Boolean,
    required: true,
  },

});
// Modelo de dstos 'cliente'
const cliente = mongoose.model("cliente", clienteShema);
// Ecportación del modelo de datos 'cliente'
module.exports = cliente;
