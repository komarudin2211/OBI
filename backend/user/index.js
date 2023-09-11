const express = require('express');
const router = express.Router();
const User = require("./model");

router.get('/user/list', async (req, res) => {
    try {
        var data  = await User.find({}, {password:0});
        return res.status(200).json(data);
    }catch(err) {

    }
});

router.post('/user/add', async (req, res) => {
    try{
        var {email, fullname, roles, password} = req.body
        var user = new User();
        user.fullname = fullname;
        user.email = email;
        user.signUpDate = new Date();
        user.roles = roles;
        user.password = user.generateHash(password);
        
        let aa = await user.save();

        return res.status(200).json({aa});
    }catch(err) {
        return res.status(500).json({message:err.message});
    }
});

router.get("/user/logout", async(req,res) => {
    try {
        res.clearCookie('fullname', { path: '/' });
        return res.status(200).json({message:'success'});
    }catch(err) {
        return res.status(200).json({...err.response});
    }

});

router.post('/user/login', async (req, res) => {
    try{
        var {email, password} = req.body
        var user = new User();
        var dataUser = await User.findOne({email:email});

        if(!dataUser){
            throw{
                message: "username or password salah 00"
            }
        }
       
        var isValid = await user.validPassword(password, dataUser.password);
        
        if(!isValid){
            throw{
                message: "username or password salah 01"
            }
        }



        let options = {
            maxAge: 1000 * 60 * 60 * 24 * 1, 
            httpOnly: true, // The cookie only accessible by the web server
            signed: true // Indicates if the cookie should be signed
        }


        res.cookie('fullname', dataUser.fullname, options) 

        return res.status(200).json({})
    }catch(err) {
        return res.status(500).json({message:err.message});
    }
});

module.exports = router