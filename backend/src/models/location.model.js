import { Schema, model } from 'mongoose';

const communeSchema = new Schema(
    {
        name: String,
        unique: true,
    },
    {
       
        versionKey: false
    }
);

const regionSchema = new Schema(
    {
        name: String,
        unique: true,
        
    },
    {
        communes: [communeSchema]
    },
    {   
        versionKey: false
    }
);

export const Region = model('Region', regionSchema);
export const Commune = model('Commune', communeSchema);