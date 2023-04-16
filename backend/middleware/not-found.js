const notFound = (req, res) => res.status(404).send('Route dosent exist')

module.exports = notFound