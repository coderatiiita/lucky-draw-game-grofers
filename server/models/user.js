const mongoose = require("mongoose");
const { Schema } = mongoose;

const raffleTicketSchema = require("./raffleTicket");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
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
    raffleTickets: [raffleTicketSchema]
});

module.exports = mongoose.model('User', userSchema);