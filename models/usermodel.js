var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;





var UserSchema = new Schema({
  username: { type: String, lowercase: true, required: true, unique: true },
  password: { type: String, required: true },
  email:    { type: String, lowercase: true, required: true, unique: true },
  tickets:  { type: Schema.Types.ObjectId, ref:"" },
  image: String
});

var User       = mongoose.model("User", UserSchema);
module.exports = User;
