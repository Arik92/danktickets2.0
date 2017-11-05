var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;
var bcrypt     = require('bcrypt-nodejs');

var UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: String,
  email:   String,
  provider: String,
  socialId: String,
  //tickets:  { type: Schema.Types.ObjectId, ref:"" },
  image: String
});

//encrypt password mongoose middlware
UserSchema.pre('save', function(next) {
  var user = this;
  //bcrypt encrypts password
  bcrypt.hash(user.password, null, null, function(err, hash) {
    if (err) return next(err);
    // Store hash in your password DB.
    user.password = hash;
    next();
  });
});

UserSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

var user       = mongoose.model("User", UserSchema);
module.exports = user;
