const mongoose = require("mongoose");
const { Schema } = mongoose;

const raffleTicketSchema = new Schema({
    isUsed: { type: Boolean, default: false, required: true },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date,
        default: Date.now()
    }     
});

module.exports = mongoose.model('RaffleTicket', raffleTicketSchema);