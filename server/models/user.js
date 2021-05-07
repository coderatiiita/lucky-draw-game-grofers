const mongoose = require("mongoose");
const { Schema } = mongoose;

const raffleTicketSchema = new Schema({
    isUsed: { type: Boolean, default: false },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    eventId: {
        type: String,
        default: ""
    }
});

const userSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    firstName: String,
    lastName: String,
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    },
    raffleTickets: {
        type: [raffleTicketSchema],
        default: []
    }
});

module.exports = mongoose.model('User', userSchema);