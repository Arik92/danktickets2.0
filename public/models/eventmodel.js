var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var locationSchema = new Schema({
  venue: String,
  address: String,
  address2: String
});
var eventSchema = new Schema({
  title: String,
  type: String, //NOTE: possible options: show, movie, gallery? for search purposes
  location: locationSchema,
  //image?
  startTime: Date,
  endTime: Date,
  //can be an object containig both starting time and ending time representation
  description: String,
  tickets: [ticketSchema],
  numTickets: Number //tickets remaining
  //TODO: image, organizer name,
  isPrivate: Boolean,
  showRemainingTicks: Boolean
});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
