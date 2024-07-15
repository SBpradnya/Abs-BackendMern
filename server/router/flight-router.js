const express = require('express');
const { createFlight, getFlights, updateFlight, deleteFlight } = require('../Controller/flight-controller');
const router = express.Router();

// Admin routes
router.post('/flights', createFlight); // Create a flight
router.get('/flights', getFlights); // Get all flights
router.put('/flights/:id', updateFlight); // Update a flight
router.delete('/flights/:id', deleteFlight); // Delete a flight

module.exports = router;
