const express = require('express');
const router = express.Router();
const Event = require('../models/event');
const RaffleTicket = require('../models/raffleTicket');
const user = require('../models/user');

router.post('/event', (req, res) => {
    const { time, onDate, reward } = req.body;
    let newEvent = new Event(time, onDate, reward);
    newEvent.save().then(() => {
        res.status(201).send({time, onDate, reward, id});
    });
});

module.exports = router;