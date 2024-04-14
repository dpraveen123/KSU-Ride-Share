
const mongoose = require('mongoose');

//define a schema/ blueprint NOTE: id is not a part of the schema 
const riderSchema = new mongoose.Schema({
    cardNumber:  { type: Number, required: true},
    expireDate:  { type: String, required: true},
    cvv:  { type: Number, required: true},
    country:  { type: String, required: true},
    zip:  { type: String, required: true}
});

//use the blueprint to create the model 
//Parameters: (model_name, schema_to_use, collection_name)
//module.exports is used to allow external access to the model  
module.exports = mongoose.model('Rider', riderSchema,'RideShare');
//note capital S in the collection name