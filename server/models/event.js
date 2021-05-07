const mongoose = require("mongoose");
const { Schema } = mongoose;

const participationSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    raffleTicketId: {
        type: String,
        required: true
    },
});

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
    },
    isExpired: {
        type: Boolean,
        default: false,
        required: true
    },
    winner: {
        type: String,
        default: ""
    },
    users: {
        type: [participationSchema],
        default: []
    }
});

module.exports = mongoose.model('Event', eventSchema);