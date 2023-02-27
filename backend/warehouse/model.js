var mongoose = require('mongoose');
const { Schema } = mongoose;

const WarehouseSchema = new Schema({
  name:{
    type: String,
    required: true,
    index:true,
    unique: true
  },
  lokasi: {
    type: String,
  },
  createDate: {
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model("Warehouse", WarehouseSchema);