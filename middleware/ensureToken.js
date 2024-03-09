const jwt = require("jsonwebtoken");
require("dotenv").config();
function ensureToken(req, res, next) {
  // header should be sent from the front end  as 'Authorization' not 'authorization'

  const token = req.session.token;

  if (typeof token !== "undefined") {
    req.token = token;
    jwt.verify(req.token, process.env.SECRECT_KEY, (err, data) => {
      if (err) {
        return res.redirect("/login");
      }
      req.userId = data.userId;
      req.userRole = data.userRole;
      next();
    });
  } else {
    return res.redirect("/login");
  }
}
module.exports = ensureToken;
