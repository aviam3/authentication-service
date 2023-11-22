const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6, },
});

// Set the 'password' field not to be returned when querying for user data
UserSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

const User = mongoose.model('user', UserSchema);
module.exports = User;
