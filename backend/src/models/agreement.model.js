// Modelo para Convenios

import { Schema, model } from 'mongoose';

const agreementSchema = new Schema(
    {
        name: String,
        description: String,
        image: String,
        benefit: String,
        region: {
            type: Schema.Types.ObjectId,
            ref: 'Region'
        },
        comuna: {
            type: Schema.Types.ObjectId,
            ref: 'Commune'
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