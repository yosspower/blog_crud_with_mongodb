const jwt = require("jsonwebtoken");
const secret_key = "enji122u3u31g12tf21f31";
function ensureToken(req, res, next) {
  // header should be sent from the front end  as 'Authorization' not 'authorization'

  const bearerHeader = req.cookies["jwt_token"];

  if (typeof bearerHeader !== "undefined") {
    const bearerToken = bearerHeader.split(" ")[1];

    req.token = bearerToken;

    jwt.verify(req.token, secret_key, (err, data) => {
      if (err) {
        return res.redirect("/login");
      }
      req.userId = data.userId;

      next();
    });
  } else {
    return res.redirect("/login");
  }
}
module.exports = ensureToken;
