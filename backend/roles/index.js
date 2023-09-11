const express = require('express');
const router = express.Router();
const Roles = require('./model');

router.get('/roles/list', async (req, res) => {
    try{
        let roles = await Roles.find();

        return res.status(200).json(roles);
    }catch(err) {

    }
});

router.post('/roles/add', async (req, res) => {
    try {
        const roles = new Roles();
        let data = await Roles.aggregate([{$group: {
            _id: "$name",
            num:{$max:'$number'}}}]);

        console.log("apa => ", data);
        let number = 1;

        if(data.length > 0){
            number = data[0].num + 1
        }
        roles.name = req.body.name.toUpperCase();
        roles.number = number;
        roles.created = new Date();
        // roles.role = role;
        // roles.password = newAdminUser.generateHash(password);
        await roles.save();

        return res.status(200).json({});
    }catch(err) {
        return res.status(500).json(err.message);
    }
});

module.exports = router