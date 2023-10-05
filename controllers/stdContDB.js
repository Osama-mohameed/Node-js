const stdModel = require('../models/stdModelDB')

//create student
let addNStudent = (req, res, nxt) => {
    let stdN = new stdModel({
        fn: req.body.fn,
        ls: req.body.ls,
        dept: req.body.dept,
        id: req.body.id
    })
    stdN.save().then(() => { res.send(stdN) }).catch((err) => {
        nxt(err)
        // for (let e in err.errors) {
        //     // console.log('error in adding new Student', err)
        //     console.log(err.errors[e].message);
        //     res.status(400).send('Bad request...filed');
        // }
    })
};


//getStudentByID
let getStdByID = async (req, res,nxt) => {
    try {
        let std = await stdModel.findById(req.params.id);
        if (!std) { return res.status(404).send('Student Not Found ') } else { res.send(std) }
        // if(!std){return  res.status(201).json({"message":"No data found"})}else{ return   res.status}
    } catch (err) {
        nxt(err)
        // for (let e in err.errors) {
        //     // console.log('error in adding new Student', err)
        //     console.log(err.errors[e].message);
        //     res.status(400).send('Bad request...filed');
        // }
    }
};
//getAllStudents
let getAllStds = async (req, res,nxt) => {
    try{
    let stds = await stdModel.find().select({ fn: 1, ls: 1 });
    res.send(stds);
}catch(err){
    nxt(err)
}
};

//updateStudent
let updateStd = async (req, res,nxt) => {
    try{

    let stdUp = await stdModel.findByIdAndUpdate(req.params.id, req.body, { returnOriginal: false });
    if (!stdUp) {
        return res.status(404).send('filed Update')
    } else res.send(stdUp);

}catch(err){
    nxt(err)
}
};

//deleteStudent
let deleteStd = async (req, res) => {
    try {

        let stdD = await stdModel.findByIdAndRemove(req.params.id);
        if (!stdD) {
            return res.status(404).send('Student Not Found ')
        } else res.send(stdD)

    } catch (err) {
        nxt(err)
    }
};

// router.post("/", validator, async (req, res) => {
//     try {
//         //check already exist 
//         let user = await User.findOne({ email: req.body.email }).exec();
//         if (user) {
//             return res.status(400).send("User already Registered...!")
//         };
//         //   create new user to be add to DB
//         let salt = await bcrypt.genSalt(10);
//         let hashedPass = await bcrypt.hash(req.body.password, salt)
//         user = new User({
//             email: req.body.email,
//             name: req.body.name,
//             password: hashedPass
//         });

//         await user.save()

//         // if (!config.get("jwtsec")) {
//             // return res.status(500).send("Request Can't be Fullfilled .. to token")
//         // };
//         const token = user.genAuthcToken();
//         res.header("x-auth-token", token);


//         res.status(200).send("ok")
//     } catch (err) {
//         for (let e in err.errors) {
//             console.log('error in adding new User', err)
//             console.log(err.errors[e].message);
//             res.status(400).send('Bad request...');
//         }
//     }

// });

module.exports = {
    addNStudent,
    getStdByID,
    getAllStds,
    updateStd,
    deleteStd
}