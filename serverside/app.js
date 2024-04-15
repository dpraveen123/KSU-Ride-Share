const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const mongoose = require("mongoose");
const Ride = require("./models/ride");

mongoose
  .connect("mongodb://127.0.0.1:27017/KsuRideShare")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, OPTIONS, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

app.get("/rides/:id", (req, res, next) => {
  Ride.findOne({ _id: req.params.id })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json(err);
    });
});

app.get("/rides", (req, res, next) => {
  Ride.find()
    .then((data) => res.status(200).json(data))
    .catch((err) => {
      console.log("Error:", err);
      res.status(500).json(err);
    });
});

app.post("/rides", (req, res, next) => {
  const ride = new Ride({
    date: req.body.date,
    time: req.body.time,
    destination: req.body.destination,
    driver: req.body.driver,
  });
  ride
    .save()
    .then(() => {
      console.log("Ride added successfully");
    })
    .catch((err) => {
      console.log("Error:", err);
    });
});

app.put("/rides/:id", (req, res, next) => {
  if (mongoose.Types.ObjectId.isValid(req.params.id)) {
    Ride.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          date: req.body.date,
          time: req.body.time,
          destination: req.body.destination,
          driver: req.body.driver,
        },
      },
      { new: true }
    )
      .then((ride) => {
        if (ride) {
          console.log("Ride updated:", ride);
        } else {
          console.log("No data exists for this id");
        }
      })
      .catch((err) => {
        console.log("Error:", err);
      });
  } else {
    console.log("Please provide correct id");
  }
});

app.delete("/rides/:id", (req, res, next) => {
  Ride.deleteOne({ _id: req.params.id }).then((result) => {
    console.log(result);
    res.status(200).json("Deleted!");
  });
});

module.exports = app;
