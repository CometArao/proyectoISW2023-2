"use strict";
const moment = require("moment");
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
    type: Date,
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

  clienteShema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    // eslint-disable-next-line require-jsdoc
    transform: function (doc, ret) {
        delete ret._id;
        ret.FechaDeNacimiento = moment(ret.FechaDeNacimiento).format("DD/MM/YYYY");
    },
  });
// Modelo de dstos 'cliente'
const cliente = mongoose.model("cliente", clienteShema);
// Ecportación del modelo de datos 'cliente'
module.exports = cliente;
