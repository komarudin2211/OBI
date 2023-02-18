var mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
  fullname:{
      type: String
  },
  email: {
      type: String,
      required: true,
      index:true,
      unique: true
  },
  password: {
      type: String,
      required: true
  },
  role:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Roles'

  },
  signUpDate: {
      type: Date,
      default: Date.now()
  },
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password, hasPassword) {
  return bcrypt.compareSync(password, hasPassword);
};

module.exports = mongoose.model("User", UserSchema);