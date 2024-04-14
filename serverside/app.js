const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Rider = require("./models/rider");
mongoose
  .connect("mongodb://localhost:27017/IT6203")
  .then(() => {
    console.log("connected");
  })
  .catch(() => {
    console.log("error connecting");
  });
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

//parse application/json
app.use(bodyParser.json());
//specify which domains can make requests and which methods are allowed
app.use((req, res, next) => {
  console.log("This line is always called");
  res.setHeader("Access-Control-Allow-Origin", "*"); //can connect from any host
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS"); //allowable methods
  res.setHeader("Access-Control-Allow-Headers", "Origin, Content-Type, Accept");
  next();
});

//in the app.get() method below we add a path for the students API
//by adding /students, we tell the server that this method will be called every time http://localhost:8000/students is requested.
app.get("/riders", (req, res, next) => {
  //we will add an array named students to pretend that we received this data from the database
  //call mongoose method find (MongoDB db.Students.find())
  Rider.find()
    //if data is returned, send data as a response
    .then((data) => res.status(200).json(data))
    //if error, send internal server error
    .catch((err) => {
      console.log("Error: ${err}");
      res.status(500).json(err);
    });
  // const riders = [
  // { "id" : "1", "cardNumber" : "123456789009" , "expireDate" : "09/07/2027","cvv":789,"country":"usa","zip":"30040" },
  // { "id" : "2", "cardNumber" : "123456789009" , "expireDate" : "09/07/2027","cvv":789,"country":"usa","zip":"30040" },
  // { "id" : "3", "cardNumber" : "123456789009" , "expireDate" : "09/07/2027","cvv":789,"country":"usa","zip":"30040" },];
  // //send the array as the response
  // res.json(riders);
});

app.post("/riders", (req, res, next) => {
  // create a new student variable and save request’s fields 
const rider = new Rider({
    cardNumber: req.body.cardNumber,
    expireDate: req.body.expireDate,
    cvv: req.body.cvv,
    country: req.body.country,
    zip: req.body.zip
});
//send the document to the database 
rider.save()
    //in case of success
    .then(() => { console.log('Success');})
    //if error
    .catch(err => {console.log('Error:' + err);});
});

//to use this middleware in other parts of the application
module.exports = app;
