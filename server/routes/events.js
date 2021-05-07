const express = require('express');
const router = express.Router();
const Moment = require('moment');
const Event = require('../models/event');
const User = require('../models/user');

router.post('/createEvent', (req, res) => {
    const { time, onDate, reward } = req.body;
    let newEvent = new Event({time, "onDate": Moment(onDate, "DD-MM-YYYY"), reward});
    newEvent.save().then(() => {
        res.status(201).send({ "success": "true", newEvent});
    }).catch(err => res.status(200).send({ "success": "false", "message": "event for this date exists!" }));
});

router.get('/nextEvent', (req, res) => {
    Event.find({"isExpired": false}).sort('onDate').limit(1).then((data)=>{
        res.status(200).send(data[0]);
    }).catch(err => res.status(400).send(err));
});

function getWinner(n) {
    return Math.floor(
        Math.random() * (n)
    );
}

router.post('/getWinner', (req, res) => {
    let { eventId } = req.body;
    Event.findOne({_id: eventId }).then( event => {
        if(!event) {
            res.status(400).send({ "success" : false, "msg": "no such event exists" });
        }
        let participants = event.users;
        if(participants.length === 0) {
            res.status(400).send({ "success": false, "msg": "no participants for this event" });
        }
        let winnerIndex = getWinner(participants.length);
        event.winner = participants[winnerIndex].userId;
        event.isExpired = true;
        event.save().then( () => {
            User.findOne({_id: event.winner }).then( user => {
                res.status(201).send({ 
                    "success": true, 
                    "winnerDetails": {
                        "userId": user._id,
                        "email": user.email,
                        "firstName": user.firstName,
                        "lastName": user.lastName,
                        "raffleTicket": participants[winnerIndex].raffleTicketId
                    }
                });
            });
        });
    });
});

router.post('/lastWeekWinners', (req, res) => {
    let winners = [];
    Event.find({ "isExpired": true, "onDate": { "$gte": Moment().subtract(1, 'weeks') } }).then(events => {
        if(events.length === 0) {
            res.status(400).send({"success": false, "msg": "no past events completed in last week" });
        }
        events.forEach( event => {
            User.findOne({ _id: event.winner }).then(user => {

            });
            winners.push(event.winner);
        });
        res.status(200).send({ "success": true, winners });
    });
});

module.exports = router;