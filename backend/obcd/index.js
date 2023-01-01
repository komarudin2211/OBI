const express = require('express');
const router = express.Router();
const OBCD = require("./model");
const Sequelize = require("sequelize");
const { ContactSupportOutlined } = require('@mui/icons-material');

router.get('/obcd/list', async (req, res) => {
    try{
        
        let Obcd = await OBCD();
       
        let data = await Obcd.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['UpdateDate', 'DESC'],
            ],
            attributes: ['BcdCode', 'ItemCode', 'UomEntry', 'UpdateDate']
        });
       
        data.every(obcd => obcd instanceof Obcd)


        return res.status(200).json({total:data.length, data:data});
    }catch(err){
        res.status(500).json(err.message);
    }
})

router.post('/obcd/add', async (req, res) => {
    try{

        let Obcd = await OBCD();
        let dataMax = await Obcd.findAll({
            order: [
                // Will escape title and validate DESC against a list of valid direction parameters
                ['BcdEntry', 'DESC'],
            ],
        });

        dataMax.every(obcd => obcd instanceof Obcd);

        var tgl = new Date().getFullYear()+"-"+new Date().getMonth()+"1-"+new Date().getDate()+" 00:00:00";
        const data = await Obcd.create({
            BcdEntry:dataMax[0].dataValues.BcdEntry + 1,
            BcdCode: req.body.number,
            ItemCode: req.body.item_code,
            UomEntry: req.body.uom_entry,
            UpdateDate: tgl
        });

        return res.status(200).json(data.OBCD);
    }catch(err){
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