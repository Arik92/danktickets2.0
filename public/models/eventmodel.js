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
  time: Date,
  description: String,
  tickets: [ticketSchema],
  numTickets: Number //tickets remaining

});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
