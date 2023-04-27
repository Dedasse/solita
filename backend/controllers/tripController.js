const {json} = require('express');
const Trip = require('../models/tripModel');

const getAllTrips = async (req, res) => {
  const { departure , returni , sort, numericFilters,departure_id,return_id} = req.query
  const queryObject = {};

  if (departure_id) {
  queryObject["Departure station id"]= departure_id
  }
  if (return_id) {
    queryObject["Return station id"]= return_id
  }

  if (departure) {
    queryObject["Departure station name"] = { $regex: departure, $options: 'i' }
    console.log(departure)
  }
  if (returni) {
    queryObject["Return station name"] = { $regex: returni, $options: 'i' }
    console.log(returni)
  }
  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['Covered_distance_m', 'Duration_sec'];
    filters = filters.split(',').forEach((item) => {
      console.log(item)
      const [field, operator, value] = item.split('-');
      console.log(field," ",operator," ",value)
      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)};
      }
    });
  }

  let result = Trip.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result= result.sort(sortList)
  } else {
    result=result.sort('Departure station name')
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const tripCount= await Trip.countDocuments(queryObject)
  const trips = await result;
  
  res.status(200).json({trips, dbHits: tripCount})
}

module.exports = {
  getAllTrips
}