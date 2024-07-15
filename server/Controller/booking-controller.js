const Flight = require("../Models/flight-model");
const Booking = require("../Models/booking-model");

// Search for available flights
const searchFlights = async (req, res) => {
    const { departureAirport, arrivalAirport, departureDate } = req.body;

    // Log the incoming request body
    console.log("Request Body:", req.body);
    
    try {
        const parsedDepartureDate = new Date(departureDate);
        
        // Check if the date is valid
        if (isNaN(parsedDepartureDate)) {
            return res.status(400).json({ message: "Invalid departure date" });
        }

        const flights = await Flight.find({
            departureAirport,
            arrivalAirport,
            departureDate: { $gte: parsedDepartureDate }
        });

        // If no flights are found, thern it return a 404 response
        if (!flights.length) {
            return res.status(404).json({ message: "No flights found" });
        }
        
        res.status(200).json({ 
            msg: "Flights retrieved successfully",
            flights: flights
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};


// Book a flight

const bookFlight = async (req, res) => {
    const { flightNumber, seatsToBook, userID } = req.body;

    // Log the request body for debugging
    console.log("Request Body:", req.body);

    // Validate input
    if (!flightNumber || !seatsToBook || !userID) {
        return res.status(400).json({ message: "Flight number, seats to book, and user ID are required" });
    }

    // Check if seatsToBook is a number and is positive
    const seatsToBookNumber = Number(seatsToBook);
    if (isNaN(seatsToBookNumber) || seatsToBookNumber <= 0) {
        return res.status(400).json({ message: "Seats to book should be a positive number" });
    }

    try {
        const flight = await Flight.findOne({ flightNumber });

        if (!flight) {
            return res.status(404).json({ message: "Flight not found" });
        }

        if (flight.availableSeats < seatsToBookNumber) {
            return res.status(400).json({ message: "Not enough seats available" });
        }

        flight.availableSeats -= seatsToBookNumber;
        await flight.save();

        // Create a new booking
        const booking = new Booking({
            userId: userID,
            flightId: flight._id,
            seatsBooked: seatsToBookNumber
        });

        await booking.save();

        res.status(200).json({ message: "Flight booked successfully", flight, booking });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// View user's bookings
const viewBookings = async (req, res) => {
    const { userId } = req.params;

    try {
        const bookings = await Booking.find({ userId }).populate('flightId');
        
        res.status(200).json(bookings);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { searchFlights, bookFlight, viewBookings };
