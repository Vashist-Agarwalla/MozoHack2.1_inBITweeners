const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    species: {
        type: String,
        require: true
    },
    climate: {
        type: [String]
    },
    water: {
        type: String,
    },
    soil: {
        type: String,
    },
    pottingMix: {
        type: String,
    },
    sunlight: [String],
    pottedBeds: {
        type: String,
    },
    growthTime: {
        type: String,
    },
    rooftop: {
        type: Boolean,
    },
    article: {
        type: String,
    },
    youtube: {
        type: String,
    },
    image: {
        type: String,
    },
    about: [String]
})

const PlantData = mongoose.model('PlantData', plantSchema)

module.exports = PlantData;