const mongoose = require('mongoose');

const rideSchema = new mongoose.Schema({
    date:  { type: String, required: true},
    time:  { type: String, required: true},
    destination:  { type: String, required: true},
    driver:  { type: String, required: true}
});

module.exports = mongoose.model('Ride', rideSchema,'Rides');
