const validator = require('../util/AthcValidator');


module.exports = (req, res, nxt) => {
    let valid = validator(req.body);
    if (valid) {
        console.log('Valid');
        req.valid = 1;
        nxt();
    } else {
        res.status(400).send(' Not valid ...!')
    }

};