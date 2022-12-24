const express = require('express');
const router = express.Router();
const WTQ1 = require("./model");

router.get('/wtq1/list', async (req, res) => {
    try{
        
        let Wtq1 = await WTQ1();
       
        let data = await Wtq1.findAll({
            attributes: ['ItemCode', 'DocDate', 'Dscription', 'Quantity', 'UomCode', 'ShipDate']
        });
       
        data.every(wtq1 => wtq1 instanceof Wtq1)


        return res.status(200).json({total:data.length, data:data});
    }catch(err){
        res.status(500).json(err.message);
    }
})


module.exports = router