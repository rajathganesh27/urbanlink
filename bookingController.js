const Booking = require("../models/bookingModel");
const mongoose = require("mongoose");

// Get all bookings
const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({}).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single booking
const getBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  try {
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ error: "No such booking" });
    }

    res.status(200).json(booking);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new booking
const createBooking = async (req, res) => {
  const { userId, rideId, numberOfSeats } = req.body;

  try {
    const booking = await Booking.create({
      userId,
      rideId,
      numberOfSeats,
      bookingStatus: "Pending", // Default to Pending
    });

    res.status(201).json(booking);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a booking
const deleteBooking = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);

    if (!deletedBooking) {
      return res.status(404).json({ error: "No such booking" });
    }

    res.status(200).json({ message: "Booking deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a booking
const updateBooking = async (req, res) => {
  const { id } = req.params;
  const updatedBookingData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such booking" });
  }

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(
      id,
      updatedBookingData,
      {
        new: true,
      }
    );

    if (!updatedBooking) {
      return res.status(404).json({ error: "No such booking" });
    }

    res.status(200).json(updatedBooking);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getBookings,
  getBooking,
  createBooking,
  deleteBooking,
  updateBooking,
};
