var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var profileSchema = new Schema({
  name: String,
  image: String,
  about: String,
  useAbout: Boolean,
  website: String,
  // facebook: String,
  // twitter: String,
  // instagram: String
});

var profile = mongoose.model("Profile", profileSchema);
module.exports = profile;
