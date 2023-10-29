"use strict";
// Modelo para Convenios
const mongoose = require("mongoose");

const agreementSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        benefit: {
            type: String,
            required: true,
        },
        region: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Region',
            required: true,
        },
        commune: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Commune',
            required: true,
        },
        exclusiveSeniors: {
            type: Boolean,
            default: false
        },
        exclusivePregnant: {
            type: Boolean,
            default: false
        },
        exclusiveDisability: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,   
        versionKey: false
    }
);

const Agreement = mongoose.model('Agreement', agreementSchema);

module.exports = Agreement;