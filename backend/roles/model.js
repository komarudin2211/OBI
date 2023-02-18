const mongoose = require('mongoose');
const { Schema } = mongoose;

const Roles = new Schema({
  name: {
    type: String,
    required:true,
    index:true,
    unique:true
  },
  created:{
    type: String
  }
});

module.exports = mongoose.model("Roles", Roles);