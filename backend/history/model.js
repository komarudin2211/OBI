var mongoose = require('mongoose');
const { Schema } = mongoose;

const HistorySchema = new Schema({
  type:{
    type: String,
  },
  text:{
    type: Object
  },
  pic: {
    type: String
  },
  createDate: {
    type: Date
  }
});

module.exports = mongoose.model("History", HistorySchema);