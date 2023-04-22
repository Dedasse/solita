const mongoose = require('mongoose');

const placeSchema = new mongoose.Schema({
  FID: {
    type: Number,
    required: true
  },
  ID: {
    type: Number,
    required: true
  },
  Nimi: {
    type: String,
    required: true
  },
  Namn: {
    type: String,
    required: true
  },
  Name: {
    type: String,
    required: true
  },
  Osoite: {
    type: String,
    required: true
  },
  Adress: {
    type: String,
    required: true
  },
  Kaupunki: {
    type: String,
    required: true
  },
  Stad: {
    type: String,
    required: true
  },
  Operaattor: {
    type: String,
    required: true
  },
  Kapasiteet: {
    type: Number,
    required: true
  },
  x: {
    type: Number,
    required: true
  },
  y: {
    type: Number,
    required: true
  }
},{collection: 'places', dbName: 'solita'}
)

module.exports = mongoose.model('Place', placeSchema)