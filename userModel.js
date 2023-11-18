const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    // You might want to add validation for phone numbers
  },
  //   userType: {
  //     type: String,
  //     enum: ["Driver", "Passenger"],
  //     default: "Passenger",
  //   },
  // You can add more fields based on your application needs
});

const User = mongoose.model("User", userSchema);

module.exports = User;
