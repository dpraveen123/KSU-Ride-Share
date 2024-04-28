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


//driverssss

app.get('/drivers', (req, res, next) => {
    
  Driver.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });

});



//find a student based on the id
app.get('/drivers/:id', (req, res, next) => {
  //call mongoose method findOne (MongoDB db.Students.findOne())
  Student.findOne({_id: req.params.id}) 
      //if data is returned, send data as a response 
      .then(data => {
          res.status(200).json(data)
          console.log(data);
      })
      //if error, send internal server error
      .catch(err => {
      console.log('Error: ${err}');
      res.status(500).json(err);
  });
});
           

app.post('/drivers', (req, res, next) => {
  // create a new student variable and save request’s fields 
  const driver = new Driver({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.phone,
      carInfo:req.body.carInfo,
      primaryCampus:req.body.primaryCampus,
      availability:req.body.availability
      
  });
  //send the document to the database 
  driver.save()
      //in case of success
      .then(() => { console.log('Success');})
      //if error
      .catch(err => {console.log('Error:' + err);});
      
});


app.delete("/drivers/:id", (req, res, next) => {
  Driver.deleteOne({ _id: req.params.id }).then(result => {
      console.log(result);
      res.status(200).json("Deleted!");
  });
});


app.put('/drivers/:id', (req, res, next) => { 
  console.log("id: " + req.params.id) 
  // check that the parameter id is valid 
  if (mongoose.Types.ObjectId.isValid(req.params.id)) { 
      //find a document and set new first and last names 
      Driver.findOneAndUpdate( 
          {_id: req.params.id}, 
          {$set:{ 
              name : req.body.name, 
              email:req.body.email,
              phone : req.body.phone,
              carInfo:req.body.carInfo,
              primaryCampus:req.body.primaryCampus,
              availability:req.body.availability
          }}, 
          {new:true} 
      ) 
      .then((driver) => { 
          if (driver) { //what was updated 
              console.log(driver); 
          } else { 
              console.log("no data exist for this id"); 
          } 
      }) 
      .catch((err) => { 
          console.log(err); 
      }); 
  } else { 
      console.log("please provide correct id"); 
  } 
});
             



module.exports = app;
