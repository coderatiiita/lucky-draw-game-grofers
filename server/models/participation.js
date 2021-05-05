const mongoose = require("mongoose");
const raffleTicket = require("./raffleTicket");
const { Schema } = mongoose;

const raffleTicketSchema = require("./raffleTicket");

const participationSchema = new Schema({
    eventId: {
        type: String,
        required: true
    },
    userID: {
        type: String,
        required: true
    },
    raffleTicketId: {
        type: String,
        required: true
    },
});

module.exports = mongoose.model('Participation', participationSchema);