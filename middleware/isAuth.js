const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
function isAuth(req, res, next) {
  const token = req.session.token;
  if (typeof token !== "undefined") {
    jwt.verify(token, secret_key, (err, data) => {
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
