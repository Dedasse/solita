const mongoose = require('mongoose');

const tripSchema = new mongoose.Schema({
  Departure: {
    type: Date,
    required: true
  },
  Return: {
    type: Date,
    required: true
  },
  'Departure station id': {
    type: Number,
    required: true
  },
  'Departure station name': {
    type: String,
    required: true
  },
  'Return station id': {
    type: Number,
    required: true
  },
  'Return station name': {
    type: String,
    required: true
  },
  'Covered_distance_m': {
    type: Number,
    required: true
  },
  'Duration_sec': {
    type: Number,
    required: true
  }
},{collection: 'trips', dbName: 'solita'}
)

module.exports = mongoose.model('Trip', tripSchema)