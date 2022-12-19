const express = require('express');
const router = express.Router();
const model = require("./model");

// define the home page route
router.get('/wtq1/list', async (req, res) => {
    try{
        let data = await model.list();
        console.log(data)
        res.status(200).json(data);
    }catch(err){
        res.status(500).json(err.message);
    }
})


module.exports = router