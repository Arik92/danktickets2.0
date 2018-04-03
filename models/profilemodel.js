var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  version: Number,
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  name: {type: String, unique: true},
  image: String,
  about: String,  
  website: String,
  facebook: String,
  twitter: String,
  instagram: String,
  merchantId: String  
});

var profile = mongoose.model("Profile", profileSchema);
module.exports = profile;
