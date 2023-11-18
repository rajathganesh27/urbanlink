const express = require("express");
const {
  getVehicles,
  getVehicle,
  createVehicle,
  deleteVehicle,
  updateVehicle,
} = require("../controllers/vehicleController");

const router = express.Router();

// GET all vehicles
router.get("/", getVehicles);

// GET a single vehicle
router.get("/:id", getVehicle);

// POST a new vehicle
router.post("/", createVehicle);

// DELETE a vehicle
router.delete("/:id", deleteVehicle);

// UPDATE a vehicle
router.patch("/:id", updateVehicle);

module.exports = router;
