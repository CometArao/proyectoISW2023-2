"use strict";
const mongoose = require("mongoose");

const communeSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    region: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Region',
        required: true,
    },
});

const regionSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    comunas: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Commune',
    }],
  }, {
    versionKey: false, 
  });

const Commune = mongoose.model('Commune', communeSchema);
const Region = mongoose.model('Region', regionSchema);

module.exports = { Region, Commune };