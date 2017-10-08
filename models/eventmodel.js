var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  venue: String,
  address: String,
  address2: String
  //NOTE: lattitude? longtitude?
});
var eventSchema = new Schema({
  title: String,
  type: String, //NOTE: possible options: show, movie, gallery? for search purposes
  publisher: String,
  location: locationSchema,
  image: String,
  startTime: Date,
  endTime: Date,
  description: String,
  //tickets: [ticketSchema],
  numTickets: Number, //tickets remaining
  //TODO: image, organizer name,
  isPrivate: Boolean,
  showRemainingTicks: Boolean
});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
