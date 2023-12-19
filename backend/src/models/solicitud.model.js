"use strict";
const mongoose = require("mongoose");
const moment = require("moment");

const solicitudSchema = new mongoose.Schema({

    Cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente",
        required: true,
    },
    Fecha: {
        type: Date,
        required: true,
    },
    Estado: {
        type: String,
        enum: ["Aceptado", "Rechazado", "Pendiente", "Derivado"],
        default: "Pendiente",
        required: false,
    },
    // Se agrega el motivoRechazo para argumentarle la razón por la que fue rechazada su solicitud.
    MotivoRechazo: {
        type: String,
        required: false,
    },
    });

    solicitudSchema.set("toJSON", {
        virtuals: true,
        versionKey: false,
        transform: function(doc, ret) {
            delete ret._id;
            ret.Fecha = moment(ret.Fecha).format("DD/MM/YYYY");
        }
      });


module.exports = mongoose.model("Solicitud", solicitudSchema);
