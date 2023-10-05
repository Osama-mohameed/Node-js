const express = require('express');
const path = require('path');
const app = express();
const path = require('path');
app.use(express.static('views'));// static filles (css,html,js,img)

app.post('/mmmm', (req, res) => {
    console.log(req.body);
    // res.send(`Thanks ${req.body.fn} ${req.body.ln}`);
    res.sendFile(path.join(__dirname,'../views/main.html'))
                               // Cookies
});