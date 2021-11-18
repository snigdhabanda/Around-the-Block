const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    name: {
      type: String,
      required: true
    },
    location: {
      type: String,
      required: true 
    },
    description: {
        type: String,
        required: true
    },
    hostId: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },  
    imageUrl: {
        type: String,
        required: true 
    },
    time: {
        type: String,
        required: true 
    },
    guests: [{
        type: Schema.Types.ObjectId,
        ref: "users"
    }]
  }, {
    timestamps: true
  })



  module.exports = Event = mongoose.model("Event", EventSchema);