"use strict";
// Importa el modulo 'mongoose' para crear la conexion a la base de datos
const mongoose = require("mongoose");

// Crea el esquema de la coleccion 'tarjetavecino'
const tarjetavecinoSchema = new mongoose.Schema(
    {
        Nombre: {
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
        RUT: {
            type: int,
            required: true,
        },
        Prioridad: {
            type: String,
            required: true,
        },
    },
    {
        versionKey: false,
    },
);

/** Modelo de datos 'tarjetavecino' */
const tarjetavecino = mongoose.model("tarjetavecino", tarjetavecinoSchema);

// Exporta el modelo de datos 'tarjetavecino'
module.exports = tarjetavecino;
