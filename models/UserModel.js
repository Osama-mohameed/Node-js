const mongoose = require('mongoose');
const valid = require('validator');
const jwt = require('jsonwebtoken');
// const config = require("config");

//2) create User schema
const userSchema = new mongoose.Schema({
    "name": {
        "type": "String",
        "required": true,
        "minlength": 2,
        "maxlength": 50
    },
    "email": {
        "type": "string",
        "required": true,
        validate: {
            validator: (val) => {
                return valid.isEmail(val);
            },
            message: '{VALUE} is not valid email'
        }
    },
    "isAdmin": { "type": "Boolean" },
    "password": {
        "type": "String",
        "required": true,
        "minlength": 5
    }

});

userSchema.method("genAuthcToken", function () {
    const token = jwt.sign({
        userid: this._id,
        adminRole: this.isAdmin
    }, "thissectokn" /*config.get('jwtsec')*/);

    return token;
});


//3) create Model
const UserModel = mongoose.model('Users', userSchema);

// exports.User=mongoose.model('User',userSchema);
module.exports = UserModel;