"use strict";
const mongoose = require("mongoose");

const communeSchema = new mongoose.Schema(
    {
        name: String,
    },
    {   
        versionKey: false
    }
);

const regionSchema = new mongoose.Schema(
    {
        name: String,
        communes: [communeSchema]
    },
    {   
        versionKey: false
    }
);

const Region = mongoose.model('Region', regionSchema);
const Commune = mongoose.model('Commune', communeSchema);

module.exports = { Region, Commune };