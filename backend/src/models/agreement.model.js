"use strict";
// Modelo para Convenios
import { Schema, model } from 'mongoose';

const agreementSchema = new Schema(
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
            type: Schema.Types.ObjectId,
            ref: 'Region',
            required: true,
        },
        commune: {
            type: Schema.Types.ObjectId,
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

export default model('Agreement', agreementSchema);