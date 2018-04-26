var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./usermodel");
var Profile = require("./profilemodel");
//var ticket = require("./ticketmodel"); we might not need this 
 
var eventSchema = new Schema({
  version: Number,
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  title: String,
  type: String,
  organizer: { type: Schema.Types.ObjectId, ref:"Profile" },
  location: Object,   
  image: String,
  startTime: Number,
  startDateDisplay: String,
  startHr: String,
  endTime: Number,
  endDateDisplay: String,
  endHr: String,
  description: String,
  eventTickets: [
    {type: Schema.Types.ObjectId, ref:"EventTicket"}
  ], //o  
  //purchasedTickets: [{type: Schema.Types.ObjectId, ref:"Ticket" }],  
  isPrivate: Boolean,
  showRemainingTicks: Boolean,
  ongoing: Boolean
});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
