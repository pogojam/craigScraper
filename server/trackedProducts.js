const db = require('./index').db

const trackedProducts = db.collection('trackedproducts')

module.exports.trackedProducts = trackedProducts
