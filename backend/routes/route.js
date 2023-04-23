const express = require('express');
const router = express.Router();

const {
  getAllTrips,
} = require('../controllers/tripController')
const {
  getAllPlaces
}= require('../controllers/placeController')

router.route('/trips').get(getAllTrips)
router.route('/places').get(getAllPlaces)

module.exports = router