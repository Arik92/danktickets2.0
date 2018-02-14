var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./usermodel");

 /*var ticketSchema = new Schema({
  type: String,
  price: Number,
  name: String,
  //isFree: Boolean
  //seat?
  //id or serial number. aside from mongoID
  description: String //NOTE: special notes to guests?
});
var ticket = mongoose.model("Ticket", ticketSchema); */
var eventSchema = new Schema({
  version: Number,
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  title: String,
  type: String,
  organizer: { type: Schema.Types.ObjectId, ref:"Profile" },
  location: Object,  
  // organizerName: String,
  image: String,
  startTime: Number,
  startDateDisplay: String,
  startHr: String,
  endTime: Number,
  endDateDisplay: String,
  endHr: String,
  description: String,
  eventTickets: [
	  {
		 ticketType: String,
		 ticketPrice: Number,
		 ticketName: String,
		 ticketQ: Number,
		 isFree: Boolean,
		 ticketSold: Number	
	  }	  
  ], //o
  numTickets: Number, //tickets remaining
  isPrivate: Boolean,
  showRemainingTicks: Boolean,
  ongoing: Boolean
});


var event = mongoose.model("Event", eventSchema);
module.exports = event;
