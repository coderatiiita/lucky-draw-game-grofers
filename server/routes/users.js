const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Event = require('../models/event');

router.post('/createUser', (req, res) => {
    let {email, firstName, lastName} = req.body;
    let newUser = new User({email, firstName, lastName});
    newUser.raffleTickets = [];
    newUser.save().then(() => {
        res.status(201).send({ successs: true, newUser });
    });//.catch(err => { res.status(400).send({err}) });
});

router.get('/allUsers', (req, res) => {
    User.find({}).then(data => {
        res.status(200).send(data);
    });
});

router.post('/getRaffleTicket', (req, res) => {
    const { userId } = req.body;
    if(!userId) {
        res.status(400).send("userId missing");
    }
    User.findOne({ _id: userId }).then(user => {
        if(!user) {
            res.status(400).send("User doesn't exist!");
        }
        user.raffleTickets.push({});
        user.save().then(() => {
            res.status(201).send({ userId, "raffleTicket": user.raffleTickets[user.raffleTickets.length-1]._id });
        });
    });
});

router.post('/participate', (req, res) => {
    const {eventId, userId, raffleTicketId} = req.body;
    let flag = true;
    User.findOne({_id: userId}).then(user => {
        user.raffleTickets.toObject().forEach( (raffleTicket, index) => {
            if(raffleTicket._id.toString() === raffleTicketId) {
                flag = false;
                if(raffleTicket.isUsed) {
                    res.status(400).send({ "success": false, "msg": "this raffle ticket is already used" });
                } else {
                    user.raffleTickets[index].isUsed = true;
                    user.save().then(() => {
                        Event.findOne({ _id: eventId }).then( event => {
                            if(event.isExpired) {
                                res.status(400).send({ "success": false, "msg": "event has already expired"});
                            }
                            
                            let flag2 = true;
                            event.users.toObject().forEach(ele => {
                                if(ele.userId === user._id.toString()) {
                                    flag2 = false;
                                    res.status(400).send({ "success": false, "msg": "you are already participating in this event"});
                                }
                            });
                            
                            if(flag2) {
                                event.users.push({
                                    userId,
                                    raffleTicketId
                                });
                        
                                event.save().then(() => { 
                                    res.status(201).send({ "success": true, "msg": "You are now participating in the event" }); 
                                });
                            }
                        });
                    });        
                }
            }
        });
    }).finally(() => {
        if(flag) {
            res.status(400).send({ "success": false, "msg": "user doesn't own the raffle ticket" });
        }
    });
});

module.exports = router;