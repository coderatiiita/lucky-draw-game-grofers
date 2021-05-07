const express = require('express');
const router = express.Router();
var cors = require('cors')

const users = require('./routes/users');
const events = require('./routes/events');

// Add json and urlencoded middleware
router.use(cors())
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/users', users);

router.use('/events', events);

module.exports = router;