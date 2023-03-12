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
        var {_id, warehouse, name, sublini, volume, barcode, sku, satuan, expire_date} = req.body

        /*var data  = await Inventory.findOne({product:_id, warehouse:warehouse});

        if(data) {
            for(let i=0; i < data.satuan.length; i++){
               if(data.satuan[i]._id.toString() == satuan[i]._id){

                    satuan[i].qtyStock = (isNaN(satuan[i].qtyStock)) ? 0 : satuan[i].qtyStock;
                    satuan[i].jmlStock = (isNaN(satuan[i].jmlStock)) ? 0 : satuan[i].jmlStock;
                    data.satuan[i].qtyStock = (isNaN(data.satuan[i].qtyStock)) ? 0 : data.satuan[i].qtyStock;
                    data.satuan[i].jmlStock = (isNaN(data.satuan[i].jmlStock)) ? 0 : data.satuan[i].jmlStock;

                    satuan[i].qtyStock = (data.satuan[i].qtyStock) ? parseInt(satuan[i].qtyStock) + parseInt(data.satuan[i].qtyStock) : satuan[i].qtyStock;
                    satuan[i].jmlStock = (data.satuan[i].jmlStock) ? satuan[i].jmlStock + data.satuan[i].jmlStock : satuan[i].jmlStock
               }
               
            }
        }

        var data = await Inventory.findOneAndUpdate({
            _id:(data) ? data._id : null,
        },
        {
            $set: {
                product : _id,
                name: name,
                warehouse:warehouse,
                sublini:sublini,
                volume :volume,
                barcode:barcode,
                sku:sku,
                satuan: satuan,
                expireDate: expire_date,
                createDate : new Date()
            }
        }, {
            new: true,
            upsert: true 
        })*/

        // console.log("new => ", satuan);

        var inventory = new Inventory();
        inventory.product = _id;
        inventory.name = name;
        inventory.warehouse = warehouse;
        inventory.sublini = sublini;
        inventory.volume = volume
        inventory.barcode = barcode;
        inventory.sku = sku;
        inventory.satuan = satuan;
        inventory.expireDate = expire_date
        inventory.createDate = new Date();
 
        let aa = await inventory.save();

        return res.status(200).json({data});
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