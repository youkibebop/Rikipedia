const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RikishiSchema = new Schema({
    name: {type: String, required: true},
    kanji: {type: String, required: true},
    division: {type: String, required: true},
    rank: {type: String, required: true},
    rank2: {type: String, required: true},
    rankId: {type: Number, required: true},
    stable: {type: String},
    dob: {type: Date, required: true},
    debutDate: {type: Date},
    birthplace: {type: String},
    height: {type: Number},
    weight: {type: Number},
    favouriteTechnique: {type: String}
});


const Rikishi = mongoose.model('Sumo', RikishiSchema);

module.exports = Rikishi;