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
  DocumentoCarnet: {
    type: String,
    default: "./uploads/imageCarnet.pdf",
  },
  FechaDeNacimiento: {
    type: Date,
    required: true,
  },
  Correo: {
    type: String,
    required: true,
  },
  Direccion: {
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
  DocumentoDiscapacidad: {
    type: String,
    default: "./uploads/imageDispacacidad.pdf",
  },
  AdultoMayor: {
    type: Boolean,
    required: true,
  },
  DocumentoAdultoMayor: {
    type: String,
    default: "./uploads/imageAdultoMayor.pdf",
  },
   Embarazada: {
    type: Boolean,
    required: true,
   },
   DocumentoEmbarazada: {
    type: String,
    default: "./uploads/imageEmbarazada.pdf",
  },
   preferenciaTarjeta: {
    type: String,
    enum: ["Física", "Digital"],
    required: true,
   },
});

  clienteShema.set("toJSON", {
    virtuals: true,
    versionKey: false,

    transform: function(doc, ret) {

        delete ret._id;
        ret.FechaDeNacimiento = moment(ret.FechaDeNacimiento).format("DD/MM/YYYY");
    },
  });
// Modelo de dstos 'cliente'
const cliente = mongoose.model("cliente", clienteShema);
// Ecportación del modelo de datos 'cliente'
module.exports = cliente;
