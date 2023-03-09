const express = require('express');
const router = express.Router();
const Inventory = require("./model");
var mongoose = require('mongoose');

router.get('/inventory/list', async (req, res) => {
    try {
        var data  = await Inventory.find({}).populate("product").populate("warehouse");

        return res.status(200).json(data);
    }catch(err) {
        return res.status(500).json({data:err.response});
    }
});

router.get('/inventory/:id', async (req, res) => {
    try {
        var data  = await Inventory.findOne({_id:req.params.id});
        return res.status(200).json(data);
    }catch(err) {console.log(err.message)
        return res.status(500).json({data:err.response});
    }
});


router.post('/inventory/add', async (req, res) => {
    try{
        var {_id, warehouse, name, sublini, volume, barcode, sku, satuan} = req.body

        var inventory = new Inventory();
        inventory.product = _id;
        inventory.name = name;
        inventory.warehouse = warehouse;
        inventory.sublini = sublini;
        inventory.volume = volume
        inventory.barcode = barcode;
        inventory.sku = sku;
        inventory.satuan = satuan;
        inventory.createDate = new Date();
 
        let aa = await inventory.save();

        return res.status(200).json({aa});
    }catch(err) {console.log(err)
        return res.status(500).json({message:err.message});
    }
});

router.post('/inventory/:id', async (req, res) => {
    try {
        var data = await Inventory.findOneAndUpdate({
            _id:req.params.id,
        },
        {
            $set: req.body
        })
        return res.status(200).json({...data});
    }catch(err) {console.log(err.message)
        return res.status(500).json({data:err.response});
    }
});

module.exports = router