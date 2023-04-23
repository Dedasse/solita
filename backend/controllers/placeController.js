const {json} = require('express');
const Place = require('../models/placeModel');

const getAllPlaces = async (req, res) => {
  const { Nimi, Namn, Name, Osoite, Adress, Kaupunki, Stad, Operaattor, Kapsiteet, x, y, sort, numericFilters} = req.query
  const queryObject = {};

  if (Nimi || Namn || Name) {
    if (Nimi) {queryObject["Nimi"] = {$regex: Nimi, $options: 'i'}} else {
      if (Namn) {queryObject["Namn"] = {$regex: Namn, $options: 'i'}} else {
        queryObject["Name"] = {$regex: Name, $options: 'i'}
      }
    }
  }

  if (Osoite || Adress) {
    if (Osoite) {queryObject["Osoite"] = {$regex: Osoite, $options: 'i'}} else {
      queryObject["Adress"] = {$regex: Adress, $options: 'i'}
    }
  }

  if (Kaupunki || Stad) {
    if (Kaupunki) {queryObject["Kaupunki"] = {$regex: Kaupunki, $options: 'i'}} else {
      queryObject["Stad"] = {$regex: Stad, $options: 'i'}
    }
  }

  if(Operaattor){queryObject["Operaattor"] = {$regex: Operaattor, $options: 'i'} }

  
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
    const options = ['Kapasiteet'];
    filters = filters.split(',').forEach((item) => {
      console.log(item)
      const [field, operator, value] = item.split('-');
      console.log(field," ",operator," ",value)
      if (options.includes(field)) {
        queryObject[field] = {[operator]: Number(value)};
      }
    });
  }

  let result = Place.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ')
    result= result.sort(sortList)
  } else {
    result=result.sort('FID')
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);
  const placeCount= await Place.countDocuments(queryObject)
  const places = await result;
  
  res.status(200).json({places, dbHits: placeCount})
}

module.exports = {
  getAllPlaces
}