
// module.exports = (err, req, res, nxt) => {
    // for (let e in error) {
    //     console.log(err.error[e].message);
    //     res.status(500).send("Interval Server Error...");
    
    // }

// }

module.exports =(err, req, res, nxt) => {
    console.error(err.stack)
    res.status(500).send("Interval Server Error...")
  }