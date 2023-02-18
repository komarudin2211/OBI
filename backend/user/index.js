const express = require('express');
const router = express.Router();
const User = require("./model");

router.get('/user/list', async (req, res) => {
    try {
        return res.status(200).json({});
    }catch(err) {

    }
});

router.get('/user/add', async (req, res) => {
    try{
        var {email, fullname, role, password} = req.body
        var user = new User();
        user.fullname = fullname;
        user.email = email;
        user.signUpDate = new Date();
        user.role = role;
        user.password = user.generateHash(password);
        
        await user.save();
        return res.status(200).json({});
    }catch(err) {

    }
});

module.exports = router