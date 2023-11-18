const mongoose = require("mongoose");

// const AutoIncrement = require("mongoose-sequence")(mongoose);

const rideSchema = new mongoose.Schema(
  {
    driverID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the Users collection
      required: true,
    },
    departureLocation: {
      type: String,
      required: true,
    },
    destinationLocation: {
      type: String,
      required: true,
    },
    departureTime: {
      type: Date,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
    },
    fare: {
      type: Number,
      required: true,
    },
    rideStatus: {
      type: String,
      enum: ["Scheduled", "In Progress", "Completed"],
      default: "Scheduled",
    },
  },
  { timestamps: true }
);
// rideSchema.plugin(AutoIncrement, {
//   inc_field: "ticket",
//   id: "ticketNums",
//   start_seq: 500,
// });
const Ride = mongoose.model("Ride", rideSchema);

module.exports = Ride;
