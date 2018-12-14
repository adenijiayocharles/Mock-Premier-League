const mongoose = require("mongoose");
const teamSchema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    year_founded: {
        type: Number,
    },
    coach: {
        type: String
    }
});

module.exports = mongoose.model("Team", teamSchema);