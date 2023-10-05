
const jwt = require('jsonwebtoken')
module.exports = (req, res, nxt) => {
    // get x-auth-token header
    const token = req.header('x-auth-token');
    if (!token) return res.status(401).send('Access Denied..');

    try {
        const decodedPayload = jwt.verify(token, "thissectokn");
        // chek user admin or not
        if (!decodedPayload.adminRole) {return res.status(401).send("access Denied....!")};
        nxt();
    } catch (err) {
        res.status(400).send("In valid Token...");
    };


}