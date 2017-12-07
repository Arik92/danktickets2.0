var ticketSchema = new Schema({
  type: String,
  price: Number,
  name: String,
  //isFree: Boolean
  //seat?
  //id or serial number. aside from mongoID
  description: String //NOTE: special notes to guests?
});
/* NOTE this model might need to be split: one side for the events so an event knows what type of possible tickets are there and
  how many of each type are left.
  The 'user' side wants to have 'ticket' references, each being an instance of a ticket object */

var ticket = mongoose.model("Ticket", ticketSchema);
module.exports = ticket;
