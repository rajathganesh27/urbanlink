const Ride = require("../models/rideModel");
const mongoose = require("mongoose");

// get all rides
const getRides = async (req, res) => {
  try {
    const rides = await Ride.find({}).sort({ createdAt: -1 });
    res.status(200).json(rides);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get a single ride
const getRide = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ride" });
  }

  try {
    const ride = await Ride.findById(id);

    if (!ride) {
      return res.status(404).json({ error: "No such ride" });
    }

    res.status(200).json(ride);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create a new ride
const createRide = async (req, res) => {
  const {
    driverID,
    departureLocation,
    destinationLocation,
    departureTime,
    availableSeats,
    fare,
    rideStatus,
  } = req.body;

  try {
    const ride = await Ride.create({
      driverID,
      departureLocation,
      destinationLocation,
      departureTime,
      availableSeats,
      fare,
      rideStatus,
    });

    res.status(200).json(ride);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a ride
const deleteRide = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ride" });
  }

  try {
    const deletedRide = await Ride.findByIdAndDelete(id);

    if (!deletedRide) {
      return res.status(404).json({ error: "No such ride" });
    }

    res.status(200).json({ message: "Ride deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update a ride
const updateRide = async (req, res) => {
  const { id } = req.params;
  const updatedRideData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ride" });
  }

  try {
    const updatedRide = await Ride.findByIdAndUpdate(id, updatedRideData, {
      new: true,
    });

    if (!updatedRide) {
      return res.status(404).json({ error: "No such ride" });
    }

    res.status(200).json(updatedRide);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRides,
  getRide,
  createRide,
  deleteRide,
  updateRide,
};
