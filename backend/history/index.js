const express = require('express');
const router = express.Router();
const History = require("./model");
var mongoose = require('mongoose');

router.get('/history/list', async (req, res) => {
    try {
        var data  = await History.find({}).sort("-createDate");

        for(let i=0; i < data.length; i++){
            data[i].text.data = JSON.parse(data[i].text.data);

            if(data[i].text.data.product) {
                data[i].text.prod_name = data[i].text.data.product.name;
            }
            else{
                data[i].text.prod_name = '';
            }

            data[i].text.satuan = data[i].text.data.satuan;
        }
        
        return res.status(200).json(data);
    }catch(err) {console.log(err)
        return res.status(500).json({data:err.response});
    }
});

router.get('/history/:id', async (req, res) => {
    try {
        var data  = await History.findOne({_id:req.params.id});
        return res.status(200).json(data);
    }catch(err) {
        return res.status(500).json({data:err.response});
    }
});


router.post('/history/add', async (req, res) => {
    try{console.log("cookies => ", req.signedCookies.fullname);
        var {_id, warehouse, name, sublini, volume, barcode, sku, satuan, expire_date} = req.body

        /*var data  = await History.findOne({product:_id, warehouse:warehouse});

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

        var data = await History.findOneAndUpdate({
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

        var history = new History();
        history.product = _id;
        history.name = name;
        history.warehouse = warehouse;
        history.sublini = sublini;
        history.volume = volume
        history.barcode = barcode;
        history.sku = sku;
        history.satuan = satuan;
        history.expireDate = expire_date
        history.createDate = new Date();
 
        let aa = await history.save();

        return res.status(200).json({aa});
    }catch(err) {console.log(err)
        return res.status(500).json({message:err.message});
    }
});

router.post('/history/:id', async (req, res) => {
    try {
        var data = await History.findOneAndUpdate({
            _id:req.params.id,
        },
        {
            $set: req.body
        });

        return res.status(200).json({...data});
    }catch(err) {console.log(err.message)
        return res.status(500).json({data:err.response});
    }
});

module.exports = router