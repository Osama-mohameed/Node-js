const validate = require('../util/validator')
const Student = require('../models/stdModel');
// const  {json} = require('stream/consumers');

const getAllStds = (req, res) => {
    //    const studentId = req.params['student_id'];
    // res.json(students);
    res.set('Access-Control-Allow-Origin', '*')

    Student.fetchAllStudents((obj)=>{
        res.render('stds.ejs', {
            std: obj
        });
    })
};
const getStdById = (req, res) => {
    let id = parseInt(req.params["id"]);
    // let id = req.params.id;
    const std = Student.find((val, idx, arr) => { return val.id == id; });
    if (std) { res.json(std); } else { res.send('Not Found') };

};
const creatStd = (req, res) => {
    let valid = validate(req.body);
    console.log(req.body)
    if (valid) {
        // req.body.id = students.length + 1;
        // students.push(req.body);
        let std = new Student(req.body);
        std.saveStudent();
        res.json(req.body);
    } else { res.status(403).send('Forbidden') };
};
const deletStd = (req, res) => {
    // var id= req.params.id;
    var idx = Student.findIndex((val) => { return val.id == req.params.id });
    if (idx != -1) {
        //  let deletedstd = 
        Student.splice(idx, 1);
        res.send(`Deleted One Element = ${idx}`)
    } else
        res.send('Element Not Found');
};
const updateStd = (req, res) => {
    let idx = Student.findIndex((val) => { return val.id == req.params.id });
    if (idx != -1) {
        // let updatedstudent={...students[idx], ...req.body} ########
        for (i in req.body) {
            Student[idx][i] = req.body[i];
        };
        res.json(Student[idx]);
    } else {
        res.send("Student not found")
    }
};



module.exports = { getAllStds, getStdById, creatStd, deletStd, updateStd };