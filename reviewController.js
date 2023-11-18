const Review = require("../models/reviewModel");
const mongoose = require("mongoose");

// Get all reviews
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.find({}).sort({ createdAt: -1 });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single review
const getReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  try {
    const review = await Review.findById(id);

    if (!review) {
      return res.status(404).json({ error: "No such review" });
    }

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Create a new review
const createReview = async (req, res) => {
  const { userId, rideId, rating, comment } = req.body;

  try {
    const review = await Review.create({
      userId,
      rideId,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a review
const deleteReview = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  try {
    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return res.status(404).json({ error: "No such review" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update a review
const updateReview = async (req, res) => {
  const { id } = req.params;
  const updatedReviewData = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such review" });
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      updatedReviewData,
      {
        new: true,
      }
    );

    if (!updatedReview) {
      return res.status(404).json({ error: "No such review" });
    }

    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getReviews,
  getReview,
  createReview,
  deleteReview,
  updateReview,
};
