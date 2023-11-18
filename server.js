require("dotenv").config();

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/user");
const rideRoutes = require("./routes/ride");
const bookRoutes = require("./routes/booking");
const reviewRoutes = require("./routes/review");
const reviewVehicles = require("./routes/vehicle");

// express app
const app = express();

// middleware
app.use(express.json());

app.use(cors({ origin: "http://localhost:3000" }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/users", userRoutes);
app.use("/rides", rideRoutes);
app.use("/booking", bookRoutes);
app.use("/reviews", reviewRoutes);
app.use("/vehicles", reviewVehicles);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("connected to database");
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
