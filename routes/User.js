const express = require('express');
const router = express.Router();
const validator = require('../middlewares/UserMWValidator');
const bcrypt = require('bcrypt');
const User = require('../models/UserModel');

// Registration 

router.post("/", validator, async (req, res,nxt) => {
    try {
        //check already exist 
        let user = await User.findOne({ email: req.body.email }).exec();
        if (user) {
            return res.status(400).send("User already Registered...!")
        };
        //   create new user to be add to DB
        let salt = await bcrypt.genSalt(10);
        let hashedPass = await bcrypt.hash(req.body.password, salt)
        user = new User({
            email: req.body.email,
            name: req.body.name,
            password: hashedPass,

        });

        await user.save()

        // if (!config.get("jwtsec")) {
        // return res.status(500).send("Request Can't be Fullfilled .. to token")
        // };
        const token = user.genAuthcToken();
        res.header("x-auth-token", token);
        res.status(200).send("ok");

    } catch (err) {
        nxt(err)
        // for (let e in err.errors) {
        //     console.log('error in adding new User', err)
        //     console.log(err.errors[e].message);
        //     res.status(400).send('Bad request...');
        // }
    }

});












module.exports = router;