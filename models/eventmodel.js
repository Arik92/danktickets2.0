var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./usermodel");

var ticketSchema = new Schema({
  type: String,
  price: Number,
  name: String,
  //isFree: Boolean
  //seat?
  //id or serial number. aside from mongoID
  description: String //NOTE: special notes to guests?
});
var eventSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  title: String,
  type: String,
  organizer: { type: Schema.Types.ObjectId, ref:"Profile" },
  location: Object,
  locationMapUrl: String,
  image: String,
  startTime: String,
  startHr: String,
  endTime: String,
  endHr: String,
  description: String,
  tickets: [ticketSchema], //o
  numTickets: Number, //tickets remaining
  isPrivate: Boolean,
  showRemainingTicks: Boolean
});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
