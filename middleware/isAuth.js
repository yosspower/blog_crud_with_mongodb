const jwt = require("jsonwebtoken");
require("dotenv").config();
function isAuth(req, res, next) {
  const token = req.session.token;
  if (typeof token !== "undefined") {
    jwt.verify(token, process.env.SECRECT_KEY, (err, data) => {
      if (err) {
        console.log(err);
        next();
      } else {
        res.redirect("/profile");
      }
    });
  } else {
    next();
  }
}
module.exports = isAuth;
