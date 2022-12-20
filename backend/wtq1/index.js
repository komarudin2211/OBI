const express = require('express');
const router = express.Router();
const model = require("./model");

// define the home page route
router.get('/wtq1/list', async (req, res) => {
    try{
        let data = await model.list();

        res.status(200).json({total:data.length, data:data});
    }catch(err){
        res.status(500).json(err.message);
    }
})


module.exports = router