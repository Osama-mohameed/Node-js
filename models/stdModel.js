const fs = require('fs');
const path = require('path');
const studentsPath = path.join("../models/data/Students.json", "data", "Students.json")

module.exports = class Student {

    constructor({ name: nm, dept }) {
        this.name = nm;
        this.dept = dept;
    }

    saveStudent() {

        // 1)read from file
        fs.readFile(studentsPath, (err, info) => {
            var stdsArr = [];
            if (!err) {
                stdsArr= JSON.parse(info);

                // 2)Update Data 
                this.id = stdsArr.length+1;
                stdsArr.push(this);

                //3) write into file 
                fs.writeFile(studentsPath,JSON.stringify(stdsArr), (err)=>{
                    console.log(" Data Doesn't Saved");
                });

                // const dataToWriteIntoFile = JSON.stringify(Students);
            };
        });
    }

    static fetchAllStudents(callback) {
        fs.readFile(studentsPath,(err,info)=>{
            if(!err){
                callback( JSON.parse(info));
            }else callback([]);
        });
    }
}


// module.exports={students}