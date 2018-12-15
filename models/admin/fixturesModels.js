const mongoose = require("mongoose");
const fixtureSchema = mongoose.Schema({
    home: {
        type: String,
        required: true,
        ref: 'Team'
    },
    away: {
        type: String,
        required: true,
        ref: 'Team'
    },
    stadium: {
        type: String,
        required: true        
    },
    playdate: {
        type: Date,
        required: true
    },
    playtime: {
        type: String,
        required: true
    },
    playstatus: {
        type: Boolean,
        default: 0
    },
    score: {
        type: Object
    }
});

module.exports = mongoose.model("Fixtures", fixtureSchema);