const mongoose = require('mongoose');

const placeSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String},
    type: {type: String},
    address: {type: String},
    coordinates: {type: Array},
    description: {type: String},
    visitors: {type: Array},
});

module.exports = mongoose.model('Place', placeSchema);