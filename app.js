const express = require('express');
const mongoose = require('mongoose')
const path = require('path');
const app = express();
const userRouter = require('./routes/User');
const studentsRouter = require('./routes/students');
const authRouter = require('./routes/authc');
const adminRouter = require("./routes/admin")
const helmet = require('helmet')
const cookieParser = require('cookie-parser');
const errorMW = require('./middlewares/errorMW');
const EJS = require('ejs');

// const errors  = require('console');
// const stdValidator = require('./middlewares/stdValidatorMW');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));// static filles (css,html,js,img)
app.use(helmet());
app.use(express.json());
app.use('/api/students', studentsRouter);
app.use('/api/User', userRouter);
app.use('/api/login', authRouter);
app.use('/api/admin', adminRouter);
app.use(errorMW); // Express Error MW
// app.use(stdValidator())


//2)set connection
const url = 'mongodb://127.0.0.1:27017/datab';
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DataBase Connected...')
}).catch((err) => { console.log(err) });


// ##################### //
// ejs  app setting 
app.set('templete engine', 'EJS');
// app.set('views','templates');//to chane file name
// ####################//
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/main.html'));

    // res.send('This is Server Response');
});
//Request Data From Clint Via Query Sring Parameters
app.get("/wellcome.html", (req, res) => {
    res.sendFile(path.join(__dirname, '/views/wellcome.html'));
    console.log(req.query)
    console.log(req.query.fn)
    console.log(req.query.ln)
});
//Request Data From Clint Via Http Body parameters
app.post('/wellcome', (req, res) => {
    console.log(req.body);
    res.send(`Thanks ${req.body.fn} ${req.body.ln}`);
    res.cookie('usernam', Buffer.from(req.body.fn).toString('base64')); // Cookies
    res.cookie('userage', 23, { httpOnly: true });                            // Cookies
});
// cookie parser
app.use(cookieParser());

app.get('/abc', (req, res) => {
    // res.sendStatus(200);
    res.status(200).send("Hello")
    console.log(Buffer.from(req.cookies.usernam, 'base64').toString());
    console.log(req.cookies.userage);

});

// test static
app.get('/static', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/pub.html'));

})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server Started on port ${port}`);
})



// var server = app.listen(process.env.PORT || 3000, () => {
//     console.log('Server is started on 127.0.0.1:'+ (process.env.PORT || 3000))
// })