const express = require('express');
const router = express.Router();
const Warehouse = require("./model");

router.get('/warehouse/list', async (req, res) => {
    try {
        var data  = await Warehouse.find({});
        return res.status(200).json(data);
    }catch(err) {

    }
});

router.post('/warehouse/add', async (req, res) => {
    try{
        var {name, lokasi, pic} = req.body
        var warehouse = new Warehouse();
        warehouse.name = name;
        warehouse.lokasi = lokasi;
        warehouse.pic = pic;
        warehouse.createDate = new Date();
        
        let aa = await warehouse.save();

        return res.status(200).json({aa});
    }catch(err) {
        return res.status(500).json({message:err.message});
    }
});

module.exports = router