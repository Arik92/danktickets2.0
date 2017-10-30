var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref:"User" },
  name: {type: String, unique: true},
  image: String,
  about: String,
  //useAbout: Boolean,
  website: String,
  // facebook: String,
  // twitter: String,
  // instagram: String
});

var profile = mongoose.model("Profile", profileSchema);
module.exports = profile;
