var ticketSchema = new Schema({
  event_id: { type: Schema.Types.ObjectId, ref:"Event" },  
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  ticketType: String,
  ticketPrice: Number,
  ticketName: String,
  ticketQ: Number,
  pci: String, // barcode string/number? TODO: find out how to store this
  checkedIn: Boolean // was this ticket checked in. Another option is to splice
  //it from the event purchased tickets array
  //isFree: Boolean
  //seat?
  //id or serial number. aside from mongoID
  //description: String //NOTE: special notes to guests?
});


var ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
