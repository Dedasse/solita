const {json} = require('express');
const Trip = require('../models/tripModel');

const getAllTrips = async (req, res) => {
  const trips = await Trip.find({ }).limit(10)
  
  res.status(200).json(trips)
}

module.exports = {
  getAllTrips
}