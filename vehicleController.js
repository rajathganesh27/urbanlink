const Vehicle = require("../models/vehicleModel");
const mongoose = require("mongoose");

// Get all vehicles
const getVehicles = async (req, res) => {
  try {
    const vehicles = await Vehicle.find({}).sort({ createdAt: -1 });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single vehicle
const getVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle" });
  }

  try {
    const vehicle = await Vehicle.findById(id);

    if (!vehicle) {
      return res.status(404).json({ error: "No such vehicle" });
    }

    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new vehicle
const createVehicle = async (req, res) => {
  const { make, model, year, capacity, ownerID, registrationNumber } = req.body;

  try {
    const vehicle = await Vehicle.create({
      make,
      model,
      year,
      capacity,
      ownerID,
      registrationNumber,
    });

    res.status(201).json(vehicle);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a vehicle
const deleteVehicle = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle" });
  }

  try {
    const deletedVehicle = await Vehicle.findByIdAndDelete(id);

    if (!deletedVehicle) {
      return res.status(404).json({ error: "No such vehicle" });
    }

    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a vehicle
const updateVehicle = async (req, res) => {
  const { id } = req.params;
  const updatedVehicleData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such vehicle" });
  }

  try {
    const updatedVehicle = await Vehicle.findByIdAndUpdate(
      id,
      updatedVehicleData,
      {
        new: true,
      }
    );

    if (!updatedVehicle) {
      return res.status(404).json({ error: "No such vehicle" });
    }

    res.status(200).json(updatedVehicle);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getVehicles,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
};
