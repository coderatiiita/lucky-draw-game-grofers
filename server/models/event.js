const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    time: {
        type: Number,
        required: true
    },
    onDate: {
        type: Date,
        required: true,
        unique: true
    },
    reward: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Event', eventSchema);