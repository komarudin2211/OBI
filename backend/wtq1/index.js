const express = require('express');
const router = express.Router();
const WTQ1 = require("./model");
const Sequelize = require("sequelize");
const { ContactSupportOutlined } = require('@mui/icons-material');

router.get('/wtq1/list', async (req, res) => {
    try{
        
        let Wtq1 = await WTQ1();
       
        let data = await Wtq1.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['DocDate', 'DESC'],
            ],
            attributes: ['DocEntry','LineNum','ItemCode', 'DocDate', 'Dscription', 'Quantity', 'UomCode', 'ShipDate']
        });
       
        data.every(wtq1 => wtq1 instanceof Wtq1)


        return res.status(200).json({total:data.length, data:data});
    }catch(err){
        res.status(500).json(err.message);
    }
})

router.get('/wtq1/add', async (req, res) => {
    try{
        
        let Wtq1 = await WTQ1();
        let dataMax = await Wtq1.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['DocEntry', 'DESC'],
            ],
        });

        dataMax.every(wtq1 => wtq1 instanceof Wtq1);
       
        var tgl = new Date().getFullYear()+"-"+new Date().getMonth()+"-"+new Date().getDate();
        const data = await Wtq1.create({
            ItemCode:"ItemCode - " + dataMax[0].DocEntry+1,
            'DocEntry':dataMax[0].DocEntry,
            LineNum:dataMax[0].LineNum+1,
            Dscription:'Testing',
            'DocDate': tgl,
            ShipDate:tgl
        });
        data.every(wtq1 => wtq1 instanceof Wtq1);
    
        return res.status(200).json(data);
    }catch(err){
        console.log("name ", err.name, err.parent)
        if(err.parent && err.parent.errors){
            for(let i = 0; i < err.parent.errors.length; i++){
                console.log(err.parent.errors[i].message)
            }
        }
        for(key in err){
            console.log(key)
        }
       
        res.status(500).json({message:err.message});
    }
})


module.exports = router