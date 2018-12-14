const mongoose = require("mongoose");
const fixtureSchema = mongoose.Schema({
    home: {
        type: String,
        required: true
    },
    away: {
        type: String,
        required: true
    },
    day: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: 0
    }
});

module.exports = mongoose.model("Fixtures", fixtureSchema);