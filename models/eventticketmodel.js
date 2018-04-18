var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require("./eventmodel");

var eventTicketSchema = new Schema({
  version: Number,
  //eventId: { type: Schema.Types.ObjectId, ref:"Event" },// 
  title: String,  
  ticketType: String,
  ticketPrice: Number,
  ticketName: String,
  ticketQ: Number,
  isFree: Boolean,		
  soldOut: Boolean,
  purchasedTickets: [{type: Schema.Types.ObjectId, ref:"Ticket"}]
  /* Should purchased tickets be here or on the event page?
  
  */
});


var event = mongoose.model("EventTicket", eventTicketSchema);
module.exports = event;
