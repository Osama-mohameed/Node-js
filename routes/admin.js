const express = require("express");
const router = express.Router();
const user = require('../models/UserModel');
const authz = require("../middlewares/AuthzMWpermission")


// Update

router.put("/:id",authz,async (req, res,nxt) => {
    try{
        let data = await user.findByIdAndUpdate({_id:req.params.id},{isAdmin:true});
        if (data)
        res.status(200).send('User Role is set to admin')
    else
    res.status(400).send("Error Data...!")
    }catch(err){
        nxt(err);
    }
});




module.exports = router;