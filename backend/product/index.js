const express = require('express');
const router = express.Router();
const Product = require("./model");

router.get('/product/list', async (req, res) => {
    try {
        var data  = await Product.find({});
        return res.status(200).json(data);
    }catch(err) {

    }
});

router.post('/product/add', async (req, res) => {
    try{
        var {name, sublini, volume, barcode, sku, satuan} = req.body
        var product = new Product();
        product.name = name;
        product.sublini = sublini;
        product.volume = volume
        product.barcode = barcode;
        product.sku = sku;
        product.satuan = satuan;
        product.createDate = new Date();
        
        let aa = await product.save();

        return res.status(200).json({aa});
    }catch(err) {
        return res.status(500).json({message:err.message});
    }
});

router.post('/product/login', async (req, res) => {
    try{
        var {email, password} = req.body
        var product = new Product();
        var dataProduct = await Product.findOne({email:email});

        if(!dataProduct){
            throw{
                message: "productname or password salah 00"
            }
        }
       
        var isValid = await product.validPassword(password, dataProduct.password);
        
        if(!isValid){
            throw{
                message: "productname or password salah 01"
            }
        }



        let options = {
            maxAge: 1000 * 60 * 15 * 24, // would expire after 15 minutes
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }


        res.cookie('fullname', dataProduct.fullname, options) 
        return res.status(200).json({})
    }catch(err) {
        return res.status(500).json({message:err.message});
    }
});

module.exports = router