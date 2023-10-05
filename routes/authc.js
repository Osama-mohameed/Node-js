const express = require('express');
const router = express.Router();
const validator = require('../middlewares/AuthcMWValidator');
const User = require('../models/UserModel');
const bcrypt = require('bcrypt');
// const pcript = require('crypto')







router.post('/', validator, async (req, res,nxt) => {

    //  check Email
    try {
        let user = await User.findOne({ email: req.body.email }).exec();
        if (!user) return res.status(400).send('Not Valid Email or Password...!');

        // check password
        const validpass = await bcrypt.compare(req.body.password, user.password);
        if (!validpass) return res.status(400).send('Invalid Email or Password...!')

        // if (!config.get("jwtsec"))return res.status(500).send("Request Can't be Fullfilled .. to token");
        const token = user.genAuthcToken();
        res.header("x-auth-token", token);

        //send response
        res.status(200).send("Login Successfull")
        // res.json({message:'Login Successfull',token:"<PASSWORD>"})
    } catch (err) {
        nxt(err)
        // for (let e in err.errors) {
        //     console.log(err.errors[e].message);
        //     res.status(400).send('Bad request...');
        // }
    }

});









module.exports = router;