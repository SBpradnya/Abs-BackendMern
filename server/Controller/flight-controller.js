const Flight = require("../Models/flight-model");

// Create a new flight
const createFlight = async (req, res) => {
    try {
        const flightExists = await Flight.findOne({ flightNumber: req.body.flightNumber });
        if (flightExists) {
            return res.status(400).json({ msg: "Flight already exists" });
        }

        const flightCreated = await Flight.create(req.body);
        res.status(201).json({ msg: "Flight created successfully", flight: flightCreated });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get all flights
const getFlights = async (req, res) => {
    try {
        const flights = await Flight.find();
        res.status(200).json(flights);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Update a flight
const updateFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!flight) {
            return res.status(404).json({ msg: "Flight not found" });
        }
        res.status(200).json({ msg: "Flight updated successfully", flight });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Delete a flight
const deleteFlight = async (req, res) => {
    try {
        const flight = await Flight.findByIdAndDelete(req.params.id);
        if (!flight) {
            return res.status(404).json({ msg: "Flight not found" });
        }
        res.status(200).json({ msg: "Flight deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { createFlight, getFlights, updateFlight, deleteFlight };
