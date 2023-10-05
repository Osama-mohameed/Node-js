const express = require('express');
const router = express.Router();
const stdController=require('../controllers/stdContDB')
const stdValidator=require('../middlewares/stdValidatorMW')
const authz = require("../middlewares/AuthzMWpermission")



// Create New student 
router.post("/",stdValidator,authz,stdController.addNStudent);

// Delete student 
router.delete('/:id',authz,stdController.deleteStd);

//Update For student Data
router.put('/:id',stdController.updateStd);




//Request All Students
router.get('/',stdController.getAllStds);

//Request ||GET  Data From Clint Via Url Parameters          //Request Student By Id
router.get('/:id',stdController.getStdByID);

module.exports=  router;
