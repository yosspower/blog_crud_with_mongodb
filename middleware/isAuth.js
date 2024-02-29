const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
function isAuth(req,res,next){
    const bearerHeader = req.headers["authorization"];

    if (typeof bearerHeader !== "undefined") {
      const bearerToken = bearerHeader.split(" ")[1];
  
      jwt.verify(bearerToken, secret_key, (err, data) => {
        if (err) {
            console.log(err)
          next();
        } else {
          res.redirect('/profile');
        }
      });
    } else {
        next();
    }
}
module.exports = isAuth;