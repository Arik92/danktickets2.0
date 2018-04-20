var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Event = require("./eventmodel");
var User = require("./usermodel");
var EventTicket = require("./eventticketmodel");

var ticketSchema = new Schema({
  eventId: { type: Schema.Types.ObjectId, ref:"Event" },  
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  eventTicketId: { type: Schema.Types.ObjectId, ref:"EventTicket" },  
  merchantId: String,
  title: String,
  ticketType: String,
  ticketPrice: Number,
  ticketName: String,
  qrCode: String, 
  imgName: String,  
  //pci: String, // barcode string/number? TODO: find out how to store this
  //ticketQ: Number, this will represent a single ticket
  checkedIn: Boolean // was this ticket checked in. Another option is to splice
  //it from the event purchased tickets array
  //isFree: Boolean
  //seat?
  //id or serial number. aside from mongoID
  //style=
  //description: String //NOTE: special notes to guests?
});


var ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
