const express = require('express');
const { searchFlights, bookFlight, viewBookings } = require('../Controller/booking-controller');
const router = express.Router();

router.post('/search', searchFlights);
router.post('/book', bookFlight);
router.get('/my-bookings/:userId', viewBookings);

module.exports = router;