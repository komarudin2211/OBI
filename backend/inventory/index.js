const express = require('express');
const router = express.Router();
const Inventory = require("./model");
const History = require("../history/model");
var mongoose = require('mongoose');

router.get('/inventory/list', async (req, res) => {
    try {
        var result  = await Inventory.find({}).populate("product").populate("warehouse").sort('expireDate');
        var data = []
        
        for(let i=0; i < result.length; i++){
            var year = result[i].expireDate.getFullYear();
            var month = result[i].expireDate.getMonth()+1;
            month = (month > 9) ? month : "0"+month
            var date = result[i].expireDate.getDate();
            date = (date > 9) ? date : "0"+date

            data.push({
                satuan: result[i].satuan,
                warehouse: result[i].warehouse,
                product: result[i].product,
                expireDate: date + "-" + month + "-"+year,
            })
         }

        return res.status(200).json(data);
    }catch(err) {console.log(err);
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

router.post('/inventory/sale', async (req,res) => {
    try {
        var {_id, warehouse, name, sublini, volume, barcode, type, satuan, expireDate, product} = req.body;

        if(type && type == 'stockopname'){
            barcode = product.barcode;
        };


        var arrDate = expireDate.split("-");
        var newDate = arrDate[2]+"-"+arrDate[1]+"-"+arrDate[0];

        var data  = await Inventory.findOne({barcode:barcode, warehouse:warehouse._id,  expireDate:{$gte: newDate, $lte: newDate}});

        if(data) {
            data = data.toObject();
            var satuanHistory = [];
            for(let i=0; i < data.satuan.length; i++){
               if(data.satuan[i]._id.toString() == satuan[i]._id && satuan[i].qty_sale){
                    satuanHistory.push({qtyStock:satuan[i].qty_sale, name:satuan[i].name});
                    if(!type){
                        data.satuan[i].qtyStock -= parseInt(satuan[i].qty_sale);
                        data.satuan[i].jmlStock -= (parseInt(satuan[i].qty_sale) * data.satuan[i].jml);
                    }
                    else{
                        data.satuan[i].qtyStock += parseInt(satuan[i].qty_sale);
                        data.satuan[i].jmlStock += (parseInt(satuan[i].qty_sale) * data.satuan[i].jml);
                    }
                    
               }
               
            }
        }

        var data = await Inventory.findOneAndUpdate({
            _id:(data) ? data._id : null,
        },
        {
            $set: {
                
                satuan: data.satuan,
                createDate : new Date()
            }
        }, {
            new: true,
            upsert: true 
        });

        req.body.satuan = satuanHistory;
        var dataHist = req.body
        dataHist.satuan = satuanHistory;

        var history = new History();
        history.text = {type: (product) ? "Stok opname" : "Jual Barang ", data: JSON.stringify(dataHist)}
        history.pic = req.signedCookies.fullname
        history.createDate = new Date();
        history.type = 'Inventory'
        history.save()

        return res.status(200).json(data);
    }catch(err){console.log("err", err)
        return res.status(500).json({data:err.response});
    }
});

router.post('/inventory/add', async (req, res) => {
    try{
        var {_id, warehouse, name, sublini, volume, barcode, sku, satuan, expire_date} = req.body;

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

        let result = await inventory.save();

        var history = new History();
        history.text = {type: "Add data ", data: JSON.stringify(req.body)}
        history.pic = req.signedCookies.fullname
        history.createDate = new Date();
        history.type = 'Inventory'
        history.save()
        return res.status(200).json({result});
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

router.get('/inventory/barcode/:barcode', async (req, res) => {
    try {
        var data  = await Inventory.findOne({barcode:req.params.barcode}).populate("product").populate("warehouse").sort("expireDate");

        if(!data){
            return res.status(200).json({message: 'Product kosong'});
        }

        var year = data.expireDate.getFullYear();
        var month = data.expireDate.getMonth() + 1;
        month = (month > 9) ? month : "0"+month;
        var date = data.expireDate.getDate();
        date = (date > 9) ? date : "0"+date;

        data = data.toObject();
        data.expireDate = date +"-"+ month +"-"+ year;

        return res.status(200).json(data);
    }catch(err) {console.log(err)
        return res.status(500).json({data:err.response});
    }
});

module.exports = router