var mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
  product:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Products',
    required:true
  },
  warehouse:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Warehouse',
    required:true
  },
  sku: {
    type: String,
    required: true
  },
  satuan: [{
    name: {
      type: String,
      required: true,
    },
    jml: {type:Number,required: true},
    qtyStock: {type:Number},
    jmlStock: {type:Number}
  }],
  expireDate: {
    type: Date,
    default: Date.now()
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
});

module.exports = mongoose.model("Inventory", ProductSchema);