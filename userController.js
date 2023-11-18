const User = require("../models/userModel");
const mongoose = require("mongoose");

// get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find({}).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create a new user
const createUser = async (req, res) => {
  const { firstName, lastName, email, password, phoneNumber, userType } =
    req.body;

  try {
    const user = await User.create({
      firstName,
      lastName,
      email,
      password, // Note: This is the plaintext password; do not use in production
      phoneNumber,
      userType,
    });

    res.status(201).json(user); // Use 201 Created status code
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(204).json(); // Use 204 No Content status code
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// update a user
const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUserData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such user" });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(id, updatedUserData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
