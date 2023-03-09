var mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  name:{
      type: String,
      required: true,
      index:true,
      unique: true
  },
  sublini: {
    type: String,
  },
  volume: {
    type: String,
    required: true
  },
  barcode:{
    type: String,
    required: true,
    index:true,
    unique: true
  },
  sku: {
    type: String,
    required: true,
    index:true,
    unique: true
  },
  satuan: [{
    name: {
      type: String,
      required: true,
    },
    jml: {type:Number}
  }],
  createDate: {
      type: Date,
      default: Date.now()
  }
});

module.exports = mongoose.model("Products", ProductSchema);