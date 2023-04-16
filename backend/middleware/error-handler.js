const {json} = require("express")

const errorHandler = async (err, req, res, next) => {
  console.log(err)
  return res.status(500),json({ msg: 'Smothing wrong'})
}

module.exports = errorHandler