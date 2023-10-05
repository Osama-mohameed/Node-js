
//1)require mongoose
const mongoose =require('mongoose');

//3) create schema
const stdSchema =new mongoose.Schema({
    fn: { type: String,
        required : [true,'First Name is required'],
        maxlength:9,
        minlength:2
    },
        ls: { type: String },
        dept: { type: String },
        id: { type: Number },
})


// 4) create model
const stdModel = mongoose.model('students',stdSchema);


// stdModel.find().then((data)=>{console.log(data)});

module.exports=stdModel;