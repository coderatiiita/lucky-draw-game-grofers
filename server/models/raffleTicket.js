const mongoose = require("mongoose");
const { Schema } = mongoose;

const raffleTicketSchema = new Schema({
    {
        id: { type: Number, required: true },
        isUsed: { type: Boolean, default: false }     
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('RaffleTicket', raffleTicketSchema);